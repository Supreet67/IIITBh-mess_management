/**
 * IIIT Bhubaneswar Mess Management System - Main Application Controller
 * Handles UI events, role transitions, dynamic rendering, modals, and canvas charts
 */

const MessApp = (function () {
  let activeRole = "student"; // 'student' | 'manager' | 'warden' | 'guest'
  let activeStudentTab = "overview";
  let activeManagerTab = "forecast";
  let activeWardenTab = "audit";
  let selectedMenuDay = "Monday";
  let selectedMenuFilter = "all"; // 'all' | 'veg' | 'non-veg'
  let isDarkMode = false;

  // Initialize
  function init() {
    setupTheme();
    setupClock();
    setupRoleSwitcher();
    setupSoundToggle();
    renderAll();

    // Subscribe to state changes
    MessStore.subscribe(() => {
      renderAll();
    });

    // Refresh crowd data periodically
    setInterval(updateLiveCrowd, 30000);
  }

  // Theme setup
  function setupTheme() {
    const saved = localStorage.getItem("iiitb_mess_theme");
    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      isDarkMode = true;
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      isDarkMode = false;
      document.documentElement.setAttribute("data-theme", "light");
    }

    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.innerHTML = isDarkMode ? "☀️" : "🌙";
      themeBtn.addEventListener("click", () => {
        isDarkMode = !isDarkMode;
        document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
        localStorage.setItem("iiitb_mess_theme", isDarkMode ? "dark" : "light");
        themeBtn.innerHTML = isDarkMode ? "☀️" : "🌙";
        SoundEngine.playClick();
        showToast(isDarkMode ? "Dark Mode activated" : "Light Mode activated", "info");
      });
    }
  }

  // Clock & Current Active Meal
  function setupClock() {
    function tick() {
      const now = new Date();
      const clockEl = document.getElementById("liveClock");
      if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        });
      }

      // Automatically highlight active meal slot
      const currentSlot = getActiveMealSlot();
      const slotTag = document.getElementById("activeMealTag");
      if (slotTag) {
        slotTag.textContent = currentSlot.name;
      }
    }
    tick();
    setInterval(tick, 1000);

    // Auto set day to today
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    selectedMenuDay = days[new Date().getDay()];
  }

  function getActiveMealSlot() {
    const state = MessStore.getState();
    const now = new Date();
    const currentDecHour = now.getHours() + now.getMinutes() / 60;

    // Breakfast: 7:30 to 9:30
    // Lunch: 12:30 to 14:30
    // Snacks: 17:00 to 18:30
    // Dinner: 19:30 to 21:45
    for (const slot of state.mealSlots) {
      if (currentDecHour >= slot.startHour && currentDecHour <= slot.endHour) {
        return slot;
      }
    }
    // Default to dinner or next upcoming meal
    if (currentDecHour < 10) return state.mealSlots[0];
    if (currentDecHour < 15) return state.mealSlots[1];
    if (currentDecHour < 19) return state.mealSlots[2];
    return state.mealSlots[3];
  }

  // Role Switcher
  function setupRoleSwitcher() {
    const roleBtns = document.querySelectorAll(".role-btn");
    roleBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const role = btn.getAttribute("data-role");
        switchRole(role);
      });
    });
  }

  function switchRole(role) {
    activeRole = role;
    SoundEngine.playClick();

    // Update active class on role buttons
    document.querySelectorAll(".role-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-role") === role);
    });

    // Auto-select user in store based on role
    const state = MessStore.getState();
    if (role === "student") {
      MessStore.setCurrentUser(state.users[0]); // Sourav
    } else if (role === "manager") {
      MessStore.setCurrentUser(state.users[2]); // Ramesh Pradhan
    } else if (role === "warden") {
      MessStore.setCurrentUser(state.users[3]); // Dr. P. K. Sahoo
    }

    renderAll();
    showToast(`Switched view to ${role.toUpperCase()} Portal`, "info");
  }

  // Sound Toggle
  function setupSoundToggle() {
    const soundBtn = document.getElementById("soundToggleBtn");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => {
        const muted = SoundEngine.toggleMute();
        soundBtn.innerHTML = muted ? "🔇" : "🔔";
        showToast(muted ? "Sound Effects Muted" : "Sound Effects Enabled", "info");
      });
    }
  }

  // Master Render
  function renderAll() {
    renderUserProfileBadge();
    renderLiveCrowds();
    renderAnnouncementTicker();

    // Show appropriate role container
    document.getElementById("studentPortalView").style.display = activeRole === "student" ? "block" : "none";
    document.getElementById("managerPortalView").style.display = activeRole === "manager" ? "block" : "none";
    document.getElementById("wardenPortalView").style.display = activeRole === "warden" ? "block" : "none";
    document.getElementById("guestPortalView").style.display = activeRole === "guest" ? "block" : "none";

    if (activeRole === "student") {
      renderStudentView();
    } else if (activeRole === "manager") {
      renderManagerView();
    } else if (activeRole === "warden") {
      renderWardenView();
    } else if (activeRole === "guest") {
      renderGuestView();
    }
  }

  // User Profile Pill in Navbar
  function renderUserProfileBadge() {
    const user = MessStore.getCurrentUser();
    const pill = document.getElementById("userProfilePill");
    if (!pill || !user) return;

    pill.innerHTML = `
      <div class="avatar-circle">${user.avatar || user.name.substring(0, 2).toUpperCase()}</div>
      <div>
        <div style="font-weight: 700; font-size: 0.82rem; line-height: 1.1;">${user.name}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted);">${user.rollNo || user.title || "Guest"}</div>
      </div>
    `;
  }

  // Announcement Ticker
  function renderAnnouncementTicker() {
    const state = MessStore.getState();
    const ticker = document.getElementById("tickerNoticeText");
    if (ticker && state.announcements.length > 0) {
      const top = state.announcements[0];
      ticker.textContent = `📢 [${top.category}] ${top.title} - ${top.content}`;
    }
  }

  // Live Crowd Simulation & update
  function renderLiveCrowds() {
    const state = MessStore.getState();
    const wrap = document.getElementById("liveCrowdBadges");
    if (!wrap) return;

    wrap.innerHTML = state.messes
      .map((m) => {
        let colorClass = "green";
        if (m.currentCrowdPct > 70) colorClass = "red";
        else if (m.currentCrowdPct > 45) colorClass = "yellow";

        return `
        <div class="crowd-pill" title="${m.name} - ${m.status}">
          <span style="font-weight: 600;">${m.name.split(" ")[0]}:</span>
          <div class="crowd-meter-mini">
            <div class="crowd-meter-fill ${colorClass}" style="width: ${m.currentCrowdPct}%;"></div>
          </div>
          <span style="font-weight: 700; font-size: 0.75rem;">${m.currentCrowdPct}% (${m.avgWaitMins}m wait)</span>
        </div>
      `;
      })
      .join("");
  }

  function updateLiveCrowd() {
    const state = MessStore.getState();
    state.messes.forEach((m) => {
      // gentle random fluctuation
      const delta = (Math.random() - 0.5) * 8;
      m.currentCrowdPct = Math.min(95, Math.max(20, Math.round(m.currentCrowdPct + delta)));
      m.avgWaitMins = Math.max(1, Math.round((m.currentCrowdPct / 100) * 12));
    });
    renderLiveCrowds();
  }

  /* ==========================================================================
     STUDENT VIEW CONTROLLER
     ========================================================================== */

  function renderStudentView() {
    // Setup Student Tabs
    const tabBtns = document.querySelectorAll(".student-tab-btn");
    tabBtns.forEach((btn) => {
      const tab = btn.getAttribute("data-tab");
      btn.classList.toggle("active", tab === activeStudentTab);
      btn.onclick = () => {
        activeStudentTab = tab;
        SoundEngine.playClick();
        renderStudentView();
      };
    });

    // Hide all sub-sections
    const sections = ["overview", "menu", "rebate", "grievance", "billing", "canteen", "poll"];
    sections.forEach((s) => {
      const el = document.getElementById("studentSection_" + s);
      if (el) el.style.display = s === activeStudentTab ? "block" : "none";
    });

    // Render active tab content
    if (activeStudentTab === "overview") renderStudentOverview();
    else if (activeStudentTab === "menu") renderStudentMenu();
    else if (activeStudentTab === "rebate") renderStudentRebates();
    else if (activeStudentTab === "grievance") renderStudentGrievances();
    else if (activeStudentTab === "billing") renderStudentBilling();
    else if (activeStudentTab === "canteen") renderStudentCanteen();
    else if (activeStudentTab === "poll") renderStudentFeastPoll();
  }

  // 1. Student Overview
  function renderStudentOverview() {
    const user = MessStore.getCurrentUser();
    const activeSlot = getActiveMealSlot();

    // Welcome banner text
    const welcomeName = document.getElementById("studentWelcomeName");
    if (welcomeName) welcomeName.textContent = user.name;

    const studentHostelBadge = document.getElementById("studentHostelBadge");
    if (studentHostelBadge) {
      studentHostelBadge.textContent = `${user.hostel} • Room ${user.roomNo} • ${user.messHall}`;
    }

    // Dynamic QR Token
    renderStudentQRToken(activeSlot);
    renderActiveMealHighlights(activeSlot);
  }

  function renderStudentQRToken(slot) {
    const user = MessStore.getCurrentUser();
    const now = new Date();
    const tokenCode = `IIITB-${slot.name.substring(0, 3).toUpperCase()}-${user.rollNo}-${now.getDate()}${now.getMonth() + 1}`;

    const canvas = document.getElementById("tokenQrCanvas");
    if (canvas && window.MessQRCode) {
      MessQRCode.renderCanvas(canvas, tokenCode, { size: 190 });
    }

    const codeDisplay = document.getElementById("tokenCodeDisplay");
    if (codeDisplay) codeDisplay.textContent = tokenCode;

    const tokenRoll = document.getElementById("tokenRollDisplay");
    if (tokenRoll) tokenRoll.textContent = user.rollNo;

    const tokenMeal = document.getElementById("tokenMealDisplay");
    if (tokenMeal) tokenMeal.textContent = slot.name;

    const tokenHostel = document.getElementById("tokenHostelDisplay");
    if (tokenHostel) tokenHostel.textContent = user.hostel;

    const tokenTime = document.getElementById("tokenTimeDisplay");
    if (tokenTime) tokenTime.textContent = slot.timeRange;

    // Simulate punch button
    const punchBtn = document.getElementById("btnPunchTokenSim");
    if (punchBtn) {
      punchBtn.onclick = () => {
        const res = MessStore.punchToken(tokenCode, user.rollNo, slot.name, "Counter 1 (Main)");
        if (res.success) {
          SoundEngine.playScanSuccess();
          showToast("✅ Token Punched Successfully! Meal Plate Approved.", "success");
        } else {
          SoundEngine.playScanError();
          showToast("⚠️ " + res.message, "warning");
        }
      };
    }
  }

  function renderActiveMealHighlights(slot) {
    const state = MessStore.getState();
    const todayMenu = state.weeklyMenu[selectedMenuDay] || state.weeklyMenu["Monday"];
    const mealData = todayMenu[slot.id] || todayMenu["dinner"];

    const titleEl = document.getElementById("currentMealTitle");
    if (titleEl) titleEl.textContent = `Today's ${slot.name} (${selectedMenuDay})`;

    const highlightEl = document.getElementById("currentMealHighlight");
    if (highlightEl) highlightEl.textContent = mealData.highlight || "Special Chef Preparation";

    const itemsWrap = document.getElementById("currentMealItemsPreview");
    if (itemsWrap) {
      itemsWrap.innerHTML = mealData.items
        .map(
          (item) => `
        <li class="meal-item-row">
          <div style="display: flex; align-items: center;">
            <span class="diet-dot ${item.type}"></span>
            <span style="font-weight: 600;">${item.name}</span>
          </div>
          <div class="dish-macro-tag">${item.cals} kcal • P: ${item.protein}</div>
        </li>
      `
        )
        .join("");
    }
  }

  // 2. Weekly Menu
  function renderStudentMenu() {
    const state = MessStore.getState();
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Render day selector buttons
    const dayWrap = document.getElementById("menuDayPills");
    if (dayWrap) {
      dayWrap.innerHTML = days
        .map(
          (d) => `
        <button class="day-pill-btn ${d === selectedMenuDay ? "active" : ""}" data-day="${d}">
          ${d}
        </button>
      `
        )
        .join("");

      dayWrap.querySelectorAll(".day-pill-btn").forEach((btn) => {
        btn.onclick = () => {
          selectedMenuDay = btn.getAttribute("data-day");
          SoundEngine.playClick();
          renderStudentMenu();
        };
      });
    }

    // Render dietary filter
    const filterBtns = document.querySelectorAll(".menu-diet-filter");
    filterBtns.forEach((btn) => {
      btn.onclick = () => {
        selectedMenuFilter = btn.getAttribute("data-filter");
        filterBtns.forEach((b) => b.classList.toggle("active", b === btn));
        SoundEngine.playClick();
        renderStudentMenu();
      };
    });

    // Render 4 meal slots
    const dayData = state.weeklyMenu[selectedMenuDay] || state.weeklyMenu["Monday"];
    const container = document.getElementById("weeklyMealSlotsGrid");
    if (!container) return;

    const activeSlot = getActiveMealSlot();

    const slotsConfig = [
      { id: "breakfast", name: "Breakfast", time: "07:30 - 09:30 AM" },
      { id: "lunch", name: "Lunch", time: "12:30 - 02:30 PM" },
      { id: "snacks", name: "Evening Snacks", time: "05:00 - 06:30 PM" },
      { id: "dinner", name: "Dinner", time: "07:30 - 09:45 PM" }
    ];

    container.innerHTML = slotsConfig
      .map((slot) => {
        const meal = dayData[slot.id];
        if (!meal) return "";
        const isCurrent = activeSlot.id === slot.id;

        // Apply filter
        const filteredItems = meal.items.filter((item) => {
          if (selectedMenuFilter === "veg") return item.type === "veg";
          if (selectedMenuFilter === "non-veg") return item.type === "non-veg";
          return true;
        });

        return `
        <div class="meal-box">
          <div class="meal-box-header ${isCurrent ? "serving-now" : ""}">
            <div>
              <div class="meal-name-title">${slot.name} ${isCurrent ? "🔥" : ""}</div>
              <div class="meal-timing-sub">${slot.time}</div>
            </div>
            <div style="font-size: 0.8rem; font-weight: 700; color: var(--iiitb-saffron);">
              ⭐ ${meal.rating || 4.7}
            </div>
          </div>
          <ul class="meal-items-list">
            ${
              filteredItems.length > 0
                ? filteredItems
                    .map(
                      (item) => `
                  <li class="meal-item-row">
                    <div>
                      <span class="diet-dot ${item.type}"></span>
                      <span style="font-weight: 600;">${item.name}</span>
                    </div>
                    <span class="dish-macro-tag">${item.cals} cal</span>
                  </li>
                `
                    )
                    .join("")
                : `<li style="padding: 1rem; color: var(--text-muted); font-size: 0.8rem;">No items matching filter</li>`
            }
          </ul>
          <div class="meal-highlight-banner">
            ✨ ${meal.highlight}
          </div>
        </div>
      `;
      })
      .join("");
  }

  // 3. Rebate Application
  function renderStudentRebates() {
    const state = MessStore.getState();
    const user = MessStore.getCurrentUser();
    const userRebates = state.rebates.filter((r) => r.studentId === user.id);

    // Render Table
    const tbody = document.getElementById("studentRebateTableBody");
    if (tbody) {
      if (userRebates.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted);">No rebate applications found.</td></tr>`;
      } else {
        tbody.innerHTML = userRebates
          .map(
            (r) => `
          <tr>
            <td><strong>${r.id}</strong></td>
            <td>${r.startDate} to ${r.endDate}</td>
            <td><strong>${r.totalDays} Days</strong></td>
            <td><strong style="color: var(--color-success);">₹${r.rebateAmount}</strong></td>
            <td style="max-width: 220px; font-size: 0.8rem;">${r.reason}</td>
            <td><span class="status-badge ${r.status.toLowerCase()}">${r.status}</span></td>
            <td><small style="color: var(--text-muted);">${r.approvedBy || "Pending Review"}</small></td>
          </tr>
        `
          )
          .join("");
      }
    }

    // Modal trigger
    const openBtn = document.getElementById("btnOpenRebateModal");
    if (openBtn) {
      openBtn.onclick = () => openModal("rebateModal");
    }

    // Form submission
    const form = document.getElementById("rebateApplicationForm");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const start = document.getElementById("rebateStartDate").value;
        const end = document.getElementById("rebateEndDate").value;
        const reason = document.getElementById("rebateReason").value;

        if (!start || !end) {
          showToast("Please select valid leave start and end dates", "warning");
          return;
        }

        const d1 = new Date(start);
        const d2 = new Date(end);
        const diffTime = d2 - d1;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (diffDays < 2) {
          showToast("Minimum 2 consecutive days required for rebate as per IIIT-Bh rules", "danger");
          return;
        }

        const newReb = MessStore.applyRebate({
          startDate: start,
          endDate: end,
          totalDays: diffDays,
          reason: reason
        });

        SoundEngine.playNotification();
        closeModal("rebateModal");
        form.reset();
        showToast(`✅ Rebate Applied! ₹${newReb.rebateAmount} requested for ${diffDays} days.`, "success");
      };
    }
  }

  // 4. Grievance / Quality Feedback
  function renderStudentGrievances() {
    const state = MessStore.getState();
    const user = MessStore.getCurrentUser();
    const userGrievances = state.grievances.filter((g) => g.studentId === user.id);

    const wrap = document.getElementById("studentGrievancesList");
    if (wrap) {
      if (userGrievances.length === 0) {
        wrap.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 2rem;">No grievances lodged. Everything smooth!</div>`;
      } else {
        wrap.innerHTML = userGrievances
          .map(
            (g) => `
          <div class="card" style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
              <div>
                <span class="status-badge ${g.status.toLowerCase().replace(" ", "")}">${g.status}</span>
                <span style="font-weight: 700; margin-left: 0.5rem;">[${g.category}] ${g.subject}</span>
              </div>
              <small style="color: var(--text-muted);">${g.submittedAt}</small>
            </div>
            <p style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 0.75rem;">${g.description}</p>
            ${
              g.response
                ? `
              <div style="background-color: var(--bg-tertiary); border-left: 3px solid var(--iiitb-blue); padding: 0.75rem; border-radius: var(--radius-sm); font-size: 0.84rem;">
                <strong style="color: var(--iiitb-blue);">Resolution Note (${g.resolvedBy || "Warden Office"}):</strong>
                <p style="margin-top: 0.25rem;">${g.response}</p>
              </div>
            `
                : `<div style="font-size: 0.78rem; color: var(--text-muted);">Awaiting inspection by Mess Committee & Caterer.</div>`
            }
          </div>
        `
          )
          .join("");
      }
    }

    const openBtn = document.getElementById("btnOpenGrievanceModal");
    if (openBtn) {
      openBtn.onclick = () => openModal("grievanceModal");
    }

    const form = document.getElementById("grievanceForm");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const category = document.getElementById("grievanceCategory").value;
        const meal = document.getElementById("grievanceMeal").value;
        const subject = document.getElementById("grievanceSubject").value;
        const desc = document.getElementById("grievanceDesc").value;

        const g = MessStore.submitGrievance({
          category,
          meal,
          subject,
          description: desc,
          urgency: "Medium"
        });

        SoundEngine.playNotification();
        closeModal("grievanceModal");
        form.reset();
        showToast(`Grievance ${g.id} registered! Warden alerted.`, "success");
      };
    }
  }

  // 5. Monthly Billing & Online Payment
  function renderStudentBilling() {
    const user = MessStore.getCurrentUser();
    const state = MessStore.getState();

    // Calculate active user rebate deductions
    const approvedRebates = state.rebates
      .filter((r) => r.studentId === user.id && r.status === "Approved")
      .reduce((sum, r) => sum + r.rebateAmount, 0);

    // Calculate canteen extras billed
    const canteenTotal = state.extraPurchases
      .filter((p) => p.studentId === user.id)
      .reduce((sum, p) => sum + p.price, 0);

    const baseFee = state.institution.monthlyBaseFee || 3600;
    const netPayable = Math.max(0, baseFee + canteenTotal - approvedRebates);

    const baseFeeEl = document.getElementById("billBaseFee");
    if (baseFeeEl) baseFeeEl.textContent = `₹${baseFee}`;

    const rebateEl = document.getElementById("billRebateDeduction");
    if (rebateEl) rebateEl.textContent = `-₹${approvedRebates}`;

    const extrasEl = document.getElementById("billExtrasTotal");
    if (extrasEl) extrasEl.textContent = `+₹${canteenTotal}`;

    const netPayableEl = document.getElementById("billNetPayable");
    if (netPayableEl) netPayableEl.textContent = `₹${netPayable}`;

    // Pay bill button
    const payBtn = document.getElementById("btnOpenPayModal");
    if (payBtn) {
      payBtn.onclick = () => {
        if (netPayable === 0) {
          showToast("Your mess account has zero due balance!", "info");
          return;
        }
        document.getElementById("payAmountModalSpan").textContent = `₹${netPayable}`;
        openModal("paymentModal");
      };
    }

    // Confirm Payment
    const confirmPayBtn = document.getElementById("btnConfirmPayment");
    if (confirmPayBtn) {
      confirmPayBtn.onclick = () => {
        const method = document.getElementById("paymentMethodSelect").value;
        const rec = MessStore.payMonthlyBill(netPayable, method);
        SoundEngine.playScanSuccess();
        closeModal("paymentModal");
        showToast(`Payment of ₹${netPayable} verified! Receipt #${rec.receiptNo}`, "success");
      };
    }

    // Print Receipt
    const printBtn = document.getElementById("btnPrintReceipt");
    if (printBtn) {
      printBtn.onclick = () => {
        preparePrintReceipt(user, baseFee, approvedRebates, canteenTotal, netPayable);
        window.print();
      };
    }
  }

  function preparePrintReceipt(user, base, rebate, extras, net) {
    const el = document.getElementById("printableInvoiceArea");
    if (!el) return;
    el.innerHTML = `
      <div style="border: 2px solid #0f172a; padding: 2rem; border-radius: 8px;">
        <div style="text-align: center; border-bottom: 2px solid #0f172a; padding-bottom: 1rem; margin-bottom: 1.5rem;">
          <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 0.25rem;">INDIAN INSTITUTE OF INFORMATION TECHNOLOGY BHUBANESWAR</h2>
          <p style="font-size: 0.9rem;">Gothapatna, Malipada, Bhubaneswar, Odisha 751003</p>
          <h3 style="font-size: 1.2rem; color: #1e3a8a; margin-top: 0.5rem;">OFFICIAL HOSTEL MESS BILL RECEIPT - NOVEMBER 2026</h3>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 1.5rem; font-size: 0.95rem;">
          <div>
            <p><strong>Student Name:</strong> ${user.name}</p>
            <p><strong>Roll Number:</strong> ${user.rollNo}</p>
            <p><strong>Branch / Year:</strong> ${user.branch} (${user.year})</p>
            <p><strong>Hostel & Room:</strong> ${user.hostel}, Room ${user.roomNo}</p>
          </div>
          <div style="text-align: right;">
            <p><strong>Receipt No:</strong> IIITB-REC-${Math.floor(100000 + Math.random() * 900000)}</p>
            <p><strong>Date of Issue:</strong> ${new Date().toLocaleDateString("en-IN")}</p>
            <p><strong>Mess Assigned:</strong> ${user.messHall}</p>
            <p><strong>Status:</strong> <span style="color: green; font-weight: bold;">PAID / VERIFIED</span></p>
          </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 1.5rem; font-size: 0.95rem;">
          <thead>
            <tr style="background: #f1f5f9; border-bottom: 2px solid #0f172a;">
              <th style="padding: 0.5rem; text-align: left;">Description</th>
              <th style="padding: 0.5rem; text-align: right;">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 0.5rem; border-bottom: 1px solid #ccc;">Base Monthly Mess Subscription</td>
              <td style="padding: 0.5rem; text-align: right; border-bottom: 1px solid #ccc;">₹${base}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border-bottom: 1px solid #ccc;">Night Canteen & Extra Food Items</td>
              <td style="padding: 0.5rem; text-align: right; border-bottom: 1px solid #ccc;">+ ₹${extras}</td>
            </tr>
            <tr>
              <td style="padding: 0.5rem; border-bottom: 1px solid #ccc;">Approved Mess Leave Rebate Deduction</td>
              <td style="padding: 0.5rem; text-align: right; border-bottom: 1px solid #ccc; color: red;">- ₹${rebate}</td>
            </tr>
            <tr style="font-weight: bold; font-size: 1.1rem; background: #f8fafc;">
              <td style="padding: 0.75rem; border-top: 2px solid #0f172a;">Net Total Paid</td>
              <td style="padding: 0.75rem; text-align: right; border-top: 2px solid #0f172a; color: #1e3a8a;">₹${net}</td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 3rem; display: flex; justify-content: space-between; font-size: 0.85rem;">
          <div><p>Authorized Signature: _______________________<br>Mess Accounts Officer, IIIT-Bh</p></div>
          <div><p>Signature: _______________________<br>Chief Warden / Committee Chair</p></div>
        </div>
      </div>
    `;
  }

  // 6. Canteen Extras & Add-ons
  function renderStudentCanteen() {
    const state = MessStore.getState();
    const grid = document.getElementById("canteenItemsGrid");
    if (!grid) return;

    grid.innerHTML = state.canteenExtras
      .map(
        (item) => `
      <div class="canteen-item-card">
        <div>
          <div class="canteen-item-icon">${item.icon}</div>
          <div class="canteen-item-name">${item.name}</div>
          <small style="color: var(--text-muted);">${item.category}</small>
        </div>
        <div>
          <div class="canteen-item-price">₹${item.price}</div>
          <button class="btn btn-primary btn-sm btn-order-extra" data-id="${item.id}" style="width: 100%;">
            Order & Add to Bill
          </button>
        </div>
      </div>
    `
      )
      .join("");

    grid.querySelectorAll(".btn-order-extra").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        const order = MessStore.purchaseExtra(id);
        if (order) {
          SoundEngine.playNotification();
          showToast(`Ordered ${order.item}! ₹${order.price} added to monthly bill.`, "success");
        }
      };
    });
  }

  // 7. Special Feast Voting Poll
  function renderStudentFeastPoll() {
    const state = MessStore.getState();
    const poll = state.activePoll;
    const wrap = document.getElementById("feastPollWrapper");
    if (!wrap || !poll) return;

    wrap.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h3 style="font-size: 1.2rem; font-weight: 800;">${poll.title}</h3>
        <p style="color: var(--text-muted); font-size: 0.9rem;">${poll.description}</p>
        <div style="margin-top: 0.4rem; font-size: 0.8rem; color: var(--iiitb-saffron); font-weight: 700;">
          ⏳ ${poll.closesIn} • Total Votes Cast: ${poll.totalVotes}
        </div>
      </div>
      <div>
        ${poll.options
          .map((opt) => {
            const pct = poll.totalVotes > 0 ? Math.round((opt.votes / poll.totalVotes) * 100) : 0;
            const isChosen = poll.selectedOption === opt.id;
            return `
            <div class="poll-option-card ${isChosen ? "selected" : ""}" data-opt="${opt.id}">
              <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 0.92rem;">
                <span>${opt.name} ${isChosen ? "✓ (Your Vote)" : ""}</span>
                <span style="color: var(--iiitb-blue);">${pct}% (${opt.votes} votes)</span>
              </div>
              <div class="poll-progress-track">
                <div class="poll-progress-bar" style="width: ${pct}%;"></div>
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    `;

    if (!poll.userHasVoted) {
      wrap.querySelectorAll(".poll-option-card").forEach((card) => {
        card.onclick = () => {
          const optId = card.getAttribute("data-opt");
          const ok = MessStore.voteFeastPoll(optId);
          if (ok) {
            SoundEngine.playNotification();
            showToast("🎉 Thank you! Your feast vote has been recorded.", "success");
          }
        };
      });
    }
  }

  /* ==========================================================================
     MESS MANAGER / CATERER VIEW CONTROLLER
     ========================================================================== */

  function renderManagerView() {
    const tabBtns = document.querySelectorAll(".manager-tab-btn");
    tabBtns.forEach((btn) => {
      const tab = btn.getAttribute("data-tab");
      btn.classList.toggle("active", tab === activeManagerTab);
      btn.onclick = () => {
        activeManagerTab = tab;
        SoundEngine.playClick();
        renderManagerView();
      };
    });

    const sections = ["forecast", "scanner", "inventory", "procurements"];
    sections.forEach((s) => {
      const el = document.getElementById("managerSection_" + s);
      if (el) el.style.display = s === activeManagerTab ? "block" : "none";
    });

    if (activeManagerTab === "forecast") renderManagerForecast();
    else if (activeManagerTab === "scanner") renderManagerScanner();
    else if (activeManagerTab === "inventory") renderManagerInventory();
    else if (activeManagerTab === "procurements") renderManagerProcurements();
  }

  function renderManagerForecast() {
    const state = MessStore.getState();
    const totalStudents = 1450;
    const activeRebatesCount = state.rebates.filter((r) => r.status === "Approved").length * 28; // approx students on leave
    const expectedPlates = totalStudents - activeRebatesCount;
    const punchedCount = state.scannedTokens.length + 320; // sample simulated current punches

    const expEl = document.getElementById("forecastExpectedPlates");
    if (expEl) expEl.textContent = expectedPlates;

    const punchEl = document.getElementById("forecastPunchedPlates");
    if (punchEl) punchEl.textContent = punchedCount;

    const wasteEl = document.getElementById("forecastWasteIndex");
    if (wasteEl) wasteEl.textContent = "< 3.2% (Low)";
  }

  function renderManagerScanner() {
    const state = MessStore.getState();
    const logList = document.getElementById("scannerLogList");
    if (!logList) return;

    logList.innerHTML = state.scannedTokens
      .map(
        (t) => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.75rem; border-bottom: 1px solid var(--border-color); font-size: 0.88rem;">
        <div>
          <span style="font-weight: 700;">${t.studentName}</span> (${t.rollNo})
          <div style="font-size: 0.75rem; color: var(--text-muted);">${t.hostel} • ${t.meal} • ${t.tokenCode}</div>
        </div>
        <div style="text-align: right;">
          <span class="status-badge normal">${t.status}</span>
          <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.2rem;">${t.timestamp}</div>
        </div>
      </div>
    `
      )
      .join("");

    // Virtual Manual Scan trigger
    const scanForm = document.getElementById("virtualScanForm");
    if (scanForm) {
      scanForm.onsubmit = (e) => {
        e.preventDefault();
        const input = document.getElementById("scanTokenInput");
        const code = input.value.trim();
        if (!code) return;

        const res = MessStore.punchToken(code, "B121045", "Dinner", "Counter 1 (Main)");
        if (res.success) {
          SoundEngine.playScanSuccess();
          showToast(`Token Verified: ${res.record.studentName} (${res.record.rollNo})`, "success");
        } else {
          SoundEngine.playScanError();
          showToast(res.message, "danger");
        }
        input.value = "";
      };
    }
  }

  function renderManagerInventory() {
    const state = MessStore.getState();
    const tbody = document.getElementById("inventoryTableBody");
    if (!tbody) return;

    tbody.innerHTML = state.inventory
      .map(
        (item) => `
      <tr>
        <td><strong>${item.name}</strong></td>
        <td>${item.category}</td>
        <td><strong>${item.currentStock} ${item.unit}</strong></td>
        <td>${item.minThreshold} ${item.unit}</td>
        <td><span class="status-badge ${item.status === "Normal" ? "normal" : "low"}">${item.status}</span></td>
        <td><small style="color: var(--text-muted);">${item.lastRestocked}</small></td>
        <td>
          <button class="btn btn-outline btn-sm btn-stock-add" data-id="${item.id}" data-name="${item.name}">
            + Restock
          </button>
        </td>
      </tr>
    `
      )
      .join("");

    tbody.querySelectorAll(".btn-stock-add").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        const name = btn.getAttribute("data-name");
        const qty = prompt(`Enter quantity to add to stock for ${name}:`, "50");
        if (qty && !isNaN(qty)) {
          MessStore.updateStock(id, Number(qty));
          SoundEngine.playNotification();
          showToast(`Stock updated! Added +${qty} to ${name}`, "success");
        }
      };
    });
  }

  function renderManagerProcurements() {
    const state = MessStore.getState();
    const tbody = document.getElementById("procurementsTableBody");
    if (!tbody) return;

    tbody.innerHTML = state.procurements
      .map(
        (po) => `
      <tr>
        <td><strong>${po.id}</strong></td>
        <td>${po.vendor}</td>
        <td style="max-width: 250px;">${po.items}</td>
        <td><strong>₹${po.amount.toLocaleString("en-IN")}</strong></td>
        <td>${po.invoiceNo}</td>
        <td>${po.date}</td>
        <td><span class="status-badge paid">${po.paymentStatus}</span></td>
      </tr>
    `
      )
      .join("");
  }

  /* ==========================================================================
     WARDEN & MESS COMMITTEE VIEW CONTROLLER
     ========================================================================== */

  function renderWardenView() {
    const tabBtns = document.querySelectorAll(".warden-tab-btn");
    tabBtns.forEach((btn) => {
      const tab = btn.getAttribute("data-tab");
      btn.classList.toggle("active", tab === activeWardenTab);
      btn.onclick = () => {
        activeWardenTab = tab;
        SoundEngine.playClick();
        renderWardenView();
      };
    });

    const sections = ["audit", "rebates", "grievances", "announcements", "analytics"];
    sections.forEach((s) => {
      const el = document.getElementById("wardenSection_" + s);
      if (el) el.style.display = s === activeWardenTab ? "block" : "none";
    });

    if (activeWardenTab === "audit") renderWardenAudit();
    else if (activeWardenTab === "rebates") renderWardenRebates();
    else if (activeWardenTab === "grievances") renderWardenGrievances();
    else if (activeWardenTab === "announcements") renderWardenAnnouncements();
    else if (activeWardenTab === "analytics") renderWardenAnalytics();
  }

  function renderWardenAudit() {
    const state = MessStore.getState();
    const container = document.getElementById("auditHistoryContainer");
    if (!container) return;

    container.innerHTML = state.audits
      .map(
        (aud) => `
      <div class="card" style="margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem; margin-bottom: 0.75rem;">
          <div>
            <h4 style="font-size: 1.1rem; font-weight: 800;">${aud.messHall} - Inspection Score: ${aud.overallScore}/100</h4>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${aud.id} • Inspected by: ${aud.inspector} on ${aud.date}</div>
          </div>
          <span class="status-badge normal" style="font-size: 0.9rem; padding: 0.4rem 0.9rem;">Grade: ${aud.grade}</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 0.75rem; font-size: 0.84rem; margin-bottom: 0.75rem;">
          <div>🍽️ Utensils Sanitation: <strong>${aud.scores.cleanlinessUtensils}%</strong></div>
          <div>💧 Water Purifier TDS: <strong>${aud.scores.waterPurifierTDS}%</strong></div>
          <div>🌡️ Food Storage Temp: <strong>${aud.scores.foodTemperatureStorage}%</strong></div>
          <div>🧤 Staff Hygiene Gear: <strong>${aud.scores.staffHygieneGear}%</strong></div>
          <div>🗑️ Waste Segregation: <strong>${aud.scores.wasteDisposalSegregation}%</strong></div>
        </div>
        <div style="font-size: 0.84rem; background: var(--bg-tertiary); padding: 0.65rem; border-radius: var(--radius-sm);">
          <strong>Chief Warden Remarks:</strong> ${aud.remarks}
        </div>
      </div>
    `
      )
      .join("");

    const newAuditBtn = document.getElementById("btnOpenNewAuditModal");
    if (newAuditBtn) {
      newAuditBtn.onclick = () => openModal("auditModal");
    }

    const auditForm = document.getElementById("newAuditForm");
    if (auditForm) {
      auditForm.onsubmit = (e) => {
        e.preventDefault();
        const mess = document.getElementById("auditMessSelect").value;
        const s1 = Number(document.getElementById("auditS1").value);
        const s2 = Number(document.getElementById("auditS2").value);
        const s3 = Number(document.getElementById("auditS3").value);
        const s4 = Number(document.getElementById("auditS4").value);
        const s5 = Number(document.getElementById("auditS5").value);
        const rem = document.getElementById("auditRemarks").value;

        const newAud = MessStore.addAudit({
          messHall: mess,
          inspector: "Dr. P. K. Sahoo (Chief Warden)",
          scores: {
            cleanlinessUtensils: s1,
            waterPurifierTDS: s2,
            foodTemperatureStorage: s3,
            staffHygieneGear: s4,
            wasteDisposalSegregation: s5
          },
          remarks: rem
        });

        SoundEngine.playNotification();
        closeModal("auditModal");
        showToast(`Audit Logged! ${mess} scored ${newAud.overallScore}% (${newAud.grade})`, "success");
      };
    }
  }

  function renderWardenRebates() {
    const state = MessStore.getState();
    const tbody = document.getElementById("wardenRebateTableBody");
    if (!tbody) return;

    tbody.innerHTML = state.rebates
      .map(
        (r) => `
      <tr>
        <td><strong>${r.id}</strong></td>
        <td><strong>${r.studentName}</strong> (${r.rollNo})<br><small style="color: var(--text-muted);">${r.hostel}</small></td>
        <td>${r.startDate} to ${r.endDate}</td>
        <td><strong>${r.totalDays} Days</strong></td>
        <td><strong style="color: var(--color-success);">₹${r.rebateAmount}</strong></td>
        <td style="max-width: 200px; font-size: 0.8rem;">${r.reason}</td>
        <td><span class="status-badge ${r.status.toLowerCase()}">${r.status}</span></td>
        <td>
          ${
            r.status === "Pending"
              ? `
            <button class="btn btn-success btn-sm btn-approve-reb" data-id="${r.id}">Approve</button>
            <button class="btn btn-danger btn-sm btn-reject-reb" data-id="${r.id}">Reject</button>
          `
              : `<small style="color: var(--text-muted);">${r.approvedBy || "Verified"}</small>`
          }
        </td>
      </tr>
    `
      )
      .join("");

    tbody.querySelectorAll(".btn-approve-reb").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        MessStore.updateRebateStatus(id, "Approved", "Dr. P. K. Sahoo (Warden)");
        SoundEngine.playScanSuccess();
        showToast(`Rebate ${id} Approved!`, "success");
      };
    });

    tbody.querySelectorAll(".btn-reject-reb").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        MessStore.updateRebateStatus(id, "Rejected", "Dr. P. K. Sahoo (Warden)");
        SoundEngine.playScanError();
        showToast(`Rebate ${id} Rejected.`, "danger");
      };
    });

    const bulkBtn = document.getElementById("btnBulkApproveRebates");
    if (bulkBtn) {
      bulkBtn.onclick = () => {
        const count = MessStore.bulkApproveRebates("Dr. P. K. Sahoo (Chief Warden)");
        SoundEngine.playNotification();
        showToast(`Approved ${count} pending rebates.`, "success");
      };
    }
  }

  function renderWardenGrievances() {
    const state = MessStore.getState();
    const list = document.getElementById("wardenGrievanceList");
    if (!list) return;

    list.innerHTML = state.grievances
      .map(
        (g) => `
      <div class="card" style="margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
          <div>
            <span class="status-badge ${g.status.toLowerCase().replace(" ", "")}">${g.status}</span>
            <span style="font-weight: 700; margin-left: 0.5rem;">[${g.category}] ${g.subject}</span>
            <div style="font-size: 0.8rem; color: var(--text-muted);">Filed by: ${g.studentName} (${g.rollNo}) • ${g.hostel} • ${g.meal}</div>
          </div>
          <small style="color: var(--text-muted);">${g.submittedAt}</small>
        </div>
        <p style="font-size: 0.88rem; margin: 0.5rem 0;">${g.description}</p>
        ${
          g.response
            ? `
          <div style="background: var(--bg-tertiary); padding: 0.6rem; border-radius: var(--radius-sm); font-size: 0.82rem;">
            <strong>Warden / Caterer Action:</strong> ${g.response}
          </div>
        `
            : `
          <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
            <button class="btn btn-primary btn-sm btn-resolve-grv" data-id="${g.id}">
              Take Action & Resolve Ticket
            </button>
          </div>
        `
        }
      </div>
    `
      )
      .join("");

    list.querySelectorAll(".btn-resolve-grv").forEach((btn) => {
      btn.onclick = () => {
        const id = btn.getAttribute("data-id");
        const action = prompt("Enter resolution message & corrective penalty/instruction:", "Caterer warned. Replaced equipment & verified temperature.");
        if (action) {
          MessStore.resolveGrievance(id, action, "Dr. P. K. Sahoo (Chief Warden)");
          SoundEngine.playNotification();
          showToast(`Ticket ${id} resolved with notice sent to student.`, "success");
        }
      };
    });
  }

  function renderWardenAnnouncements() {
    const state = MessStore.getState();
    const list = document.getElementById("wardenAnnouncementsList");
    if (!list) return;

    list.innerHTML = state.announcements
      .map(
        (a) => `
      <div class="card" style="margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
          <h4 style="font-weight: 800; font-size: 1rem;">📢 ${a.title}</h4>
          <span class="status-badge ${a.priority === "High" ? "low" : "normal"}">${a.priority} Priority</span>
        </div>
        <p style="font-size: 0.88rem; color: var(--text-main); margin-bottom: 0.5rem;">${a.content}</p>
        <div style="font-size: 0.75rem; color: var(--text-muted);">Issued by: ${a.issuedBy} • Date: ${a.date}</div>
      </div>
    `
      )
      .join("");

    const openBtn = document.getElementById("btnOpenAnnouncementModal");
    if (openBtn) {
      openBtn.onclick = () => openModal("announcementModal");
    }

    const form = document.getElementById("newAnnouncementForm");
    if (form) {
      form.onsubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById("annTitle").value;
        const cat = document.getElementById("annCategory").value;
        const prio = document.getElementById("annPriority").value;
        const cont = document.getElementById("annContent").value;

        MessStore.addAnnouncement(title, cont, prio, cat);
        SoundEngine.playNotification();
        closeModal("announcementModal");
        showToast("📢 Campus Mess Announcement Published!", "success");
      };
    }
  }

  // 5. Warden Analytics (Native HTML5 Canvas Bar & Line Chart)
  function renderWardenAnalytics() {
    drawAttendanceChart();
    drawFinancialChart();
  }

  function drawAttendanceChart() {
    const canvas = document.getElementById("attendanceChartCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = canvas.parentElement.clientWidth || 550);
    const h = (canvas.height = 240);

    ctx.clearRect(0, 0, w, h);

    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const breakfast = [1180, 1220, 1150, 1200, 1100, 1310, 1390];
    const lunch = [1340, 1310, 1360, 1290, 1330, 1380, 1420];
    const dinner = [1390, 1380, 1440, 1360, 1410, 1400, 1450];

    const padding = 40;
    const chartW = w - padding * 2;
    const chartH = h - padding * 2;
    const barGroupW = chartW / labels.length;

    // Draw grid lines
    ctx.strokeStyle = isDarkMode ? "#334155" : "#e2e8f0";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(w - padding, y);
      ctx.stroke();

      ctx.fillStyle = isDarkMode ? "#94a3b8" : "#64748b";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(1500 - i * 375, padding - 6, y + 3);
    }

    // Draw bars
    labels.forEach((lbl, idx) => {
      const x = padding + idx * barGroupW;
      const bW = barGroupW * 0.22;

      // Breakfast bar (Blue)
      const bH = (breakfast[idx] / 1500) * chartH;
      ctx.fillStyle = "#2563eb";
      ctx.fillRect(x + bW * 0.3, padding + chartH - bH, bW, bH);

      // Lunch bar (Saffron)
      const lH = (lunch[idx] / 1500) * chartH;
      ctx.fillStyle = "#f97316";
      ctx.fillRect(x + bW * 1.5, padding + chartH - lH, bW, lH);

      // Dinner bar (Green)
      const dH = (dinner[idx] / 1500) * chartH;
      ctx.fillStyle = "#10b981";
      ctx.fillRect(x + bW * 2.7, padding + chartH - dH, bW, dH);

      // X Label
      ctx.fillStyle = isDarkMode ? "#f8fafc" : "#0f172a";
      ctx.textAlign = "center";
      ctx.font = "11px sans-serif";
      ctx.fillText(lbl, x + barGroupW * 0.5, h - padding + 16);
    });
  }

  function drawFinancialChart() {
    const canvas = document.getElementById("financialChartCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const w = (canvas.width = canvas.parentElement.clientWidth || 550);
    const h = (canvas.height = 240);

    ctx.clearRect(0, 0, w, h);

    // Simple visual distribution pie or donut
    const centerX = w / 2;
    const centerY = h / 2;
    const radius = Math.min(w, h) * 0.35;

    const data = [
      { label: "Raw Grocery & Dairy (62%)", pct: 0.62, color: "#2563eb" },
      { label: "Kitchen Fuel & LPG (12%)", pct: 0.12, color: "#f97316" },
      { label: "Staff Wages & Sanitation (18%)", pct: 0.18, color: "#10b981" },
      { label: "Rebates Credited (8%)", pct: 0.08, color: "#8b5cf6" }
    ];

    let startAngle = 0;
    data.forEach((seg) => {
      const slice = seg.pct * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + slice);
      ctx.closePath();
      ctx.fillStyle = seg.color;
      ctx.fill();
      startAngle += slice;
    });

    // Donut hole
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.55, 0, 2 * Math.PI);
    ctx.fillStyle = isDarkMode ? "#131d33" : "#ffffff";
    ctx.fill();

    ctx.fillStyle = isDarkMode ? "#ffffff" : "#0f172a";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("₹52.2 Lakhs", centerX, centerY);
    ctx.font = "10px sans-serif";
    ctx.fillStyle = isDarkMode ? "#94a3b8" : "#64748b";
    ctx.fillText("Monthly Mess Fund", centerX, centerY + 14);
  }

  /* ==========================================================================
     GUEST VISITOR VIEW
     ========================================================================== */

  function renderGuestView() {
    const btnBook = document.getElementById("btnBookGuestToken");
    if (btnBook) {
      btnBook.onclick = () => {
        const name = document.getElementById("guestNameInput").value || "Campus Visitor";
        const meal = document.getElementById("guestMealSelect").value;
        const code = `IIITB-GST-${Math.floor(1000 + Math.random() * 9000)}`;

        const canvas = document.getElementById("guestTokenQrCanvas");
        if (canvas && window.MessQRCode) {
          MessQRCode.renderCanvas(canvas, code, { size: 180 });
        }

        document.getElementById("guestTokenResult").style.display = "block";
        SoundEngine.playNotification();
        showToast(`Guest Token Generated for ${name}!`, "success");
      };
    }
  }

  /* ==========================================================================
     MODALS & UTILITIES
     ========================================================================== */

  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add("active");
      SoundEngine.playClick();
    }
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove("active");
    }
  }

  // Bind close buttons on all modals
  document.querySelectorAll(".modal-close-btn, .btn-modal-cancel").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal-backdrop");
      if (modal) modal.classList.remove("active");
    });
  });

  // Toast Notification
  function showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <span style="font-size: 1.1rem;">${type === "success" ? "✅" : type === "danger" ? "❌" : type === "warning" ? "⚠️" : "ℹ️"}</span>
      <div style="flex: 1;">${message}</div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  return {
    init,
    switchRole,
    openModal,
    closeModal,
    showToast
  };
})();

// Bootstrap on DOM loaded
document.addEventListener("DOMContentLoaded", () => {
  MessApp.init();
});
