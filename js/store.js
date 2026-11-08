/**
 * IIIT Bhubaneswar Mess Management System - Store / State Manager
 * Handles local persistence, reactivity, mutations, and export/import
 */

const MessStore = (function () {
  const STORAGE_KEY = "iiitb_messmate_db_v1";
  const USER_KEY = "iiitb_messmate_current_user_v1";

  let state = {};
  const subscribers = [];

  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        state = JSON.parse(stored);
      } else {
        state = JSON.parse(JSON.stringify(SEED_DATA));
        saveState();
      }
    } catch (e) {
      console.warn("Error parsing state from localStorage, resetting to seed data:", e);
      state = JSON.parse(JSON.stringify(SEED_DATA));
      saveState();
    }

    // Set default active user if missing
    if (!getCurrentUser()) {
      setCurrentUser(state.users[0]);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      notifySubscribers();
    } catch (e) {
      console.error("Failed to save state to localStorage:", e);
    }
  }

  function notifySubscribers() {
    subscribers.forEach((cb) => {
      try {
        cb(state);
      } catch (err) {
        console.error("Subscriber callback error:", err);
      }
    });
  }

  // Initial load
  loadState();

  return {
    getState: () => state,

    subscribe: (callback) => {
      subscribers.push(callback);
      return () => {
        const idx = subscribers.indexOf(callback);
        if (idx !== -1) subscribers.splice(idx, 1);
      };
    },

    getCurrentUser: () => {
      try {
        const u = localStorage.getItem(USER_KEY);
        if (u) return JSON.parse(u);
      } catch (e) {}
      return state.users && state.users[0] ? state.users[0] : null;
    },

    setCurrentUser: (user) => {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      notifySubscribers();
    },

    setCurrentUserById: (userId) => {
      const u = state.users.find((x) => x.id === userId);
      if (u) {
        localStorage.setItem(USER_KEY, JSON.stringify(u));
        notifySubscribers();
        return u;
      }
      return null;
    },

    // Rebate operations
    applyRebate: (rebateData) => {
      const id = "REB-" + new Date().getFullYear() + "-" + Math.floor(100 + Math.random() * 900);
      const user = MessStore.getCurrentUser();
      const newRebate = {
        id,
        studentId: user.id,
        studentName: user.name,
        rollNo: user.rollNo,
        hostel: user.hostel,
        messHall: user.messHall,
        startDate: rebateData.startDate,
        endDate: rebateData.endDate,
        totalDays: rebateData.totalDays,
        rebateAmount: rebateData.totalDays * (state.institution.dailyRebateRate || 120),
        reason: rebateData.reason,
        status: "Pending",
        appliedOn: new Date().toISOString().split("T")[0],
        approvedBy: null,
        approvedAt: null
      };

      state.rebates.unshift(newRebate);
      saveState();
      return newRebate;
    },

    updateRebateStatus: (rebateId, status, approvedBy) => {
      const reb = state.rebates.find((r) => r.id === rebateId);
      if (reb) {
        reb.status = status;
        reb.approvedBy = approvedBy || "Chief Warden Office";
        reb.approvedAt = new Date().toISOString().split("T")[0];
        saveState();
        return reb;
      }
      return null;
    },

    bulkApproveRebates: (approvedBy) => {
      let count = 0;
      state.rebates.forEach((r) => {
        if (r.status === "Pending") {
          r.status = "Approved";
          r.approvedBy = approvedBy || "Chief Warden Office";
          r.approvedAt = new Date().toISOString().split("T")[0];
          count++;
        }
      });
      if (count > 0) saveState();
      return count;
    },

    // Grievance / Feedback operations
    submitGrievance: (data) => {
      const id = "GRV-" + Math.floor(8000 + Math.random() * 2000);
      const user = MessStore.getCurrentUser();
      const now = new Date();
      const timeStr = now.toISOString().replace("T", " ").substring(0, 16);

      const newGrievance = {
        id,
        studentId: user.id,
        studentName: user.name,
        rollNo: user.rollNo,
        hostel: user.hostel,
        messHall: user.messHall || "Central Mess",
        category: data.category,
        meal: data.meal,
        subject: data.subject,
        description: data.description,
        urgency: data.urgency || "Medium",
        status: "Under Review",
        submittedAt: timeStr,
        response: null,
        resolvedBy: null,
        rating: null
      };

      state.grievances.unshift(newGrievance);
      saveState();
      return newGrievance;
    },

    resolveGrievance: (id, responseText, resolvedBy) => {
      const g = state.grievances.find((x) => x.id === id);
      if (g) {
        g.status = "Resolved";
        g.response = responseText;
        g.resolvedBy = resolvedBy || "Mess Committee";
        saveState();
        return g;
      }
      return null;
    },

    // Feast Poll Vote
    voteFeastPoll: (optionId) => {
      if (!state.activePoll) return null;
      const opt = state.activePoll.options.find((o) => o.id === optionId);
      if (opt && !state.activePoll.userHasVoted) {
        opt.votes++;
        state.activePoll.totalVotes++;
        state.activePoll.userHasVoted = true;
        state.activePoll.selectedOption = optionId;
        saveState();
        return true;
      }
      return false;
    },

    // Extra Canteen Items Purchase
    purchaseExtra: (itemId) => {
      const item = state.canteenExtras.find((e) => e.id === itemId);
      const user = MessStore.getCurrentUser();
      if (!item || !user) return null;

      const txId = "TX-" + Math.floor(400 + Math.random() * 600);
      const now = new Date();
      const timeStr = now.toISOString().replace("T", " ").substring(0, 16);

      const purchase = {
        id: txId,
        studentId: user.id,
        item: item.name,
        price: item.price,
        date: timeStr,
        status: "Billed"
      };

      state.extraPurchases.unshift(purchase);
      // adjust user balance
      const u = state.users.find((x) => x.id === user.id);
      if (u) {
        u.balance = (u.balance || 0) + item.price;
        MessStore.setCurrentUser(u);
      }
      saveState();
      return purchase;
    },

    // Settle / Pay monthly bill
    payMonthlyBill: (amount, method) => {
      const user = MessStore.getCurrentUser();
      const u = state.users.find((x) => x.id === user.id);
      if (u) {
        u.balance = 0; // cleared
        MessStore.setCurrentUser(u);
      }
      saveState();
      return {
        receiptNo: "IIITB-MESS-REC-" + Math.floor(100000 + Math.random() * 900000),
        amount,
        method: method || "UPI (PhonePe / GPay)",
        date: new Date().toLocaleString("en-IN")
      };
    },

    // Token verification and punch
    punchToken: (tokenCode, studentRollNo, mealName, counterName) => {
      // Check if already punched in last 1 hour
      const already = state.scannedTokens.find(
        (t) => t.tokenCode === tokenCode || (t.rollNo === studentRollNo && t.meal === mealName)
      );

      if (already) {
        return {
          success: false,
          message: `Already punched for ${mealName} at ${already.timestamp} on ${already.counter}!`,
          record: already
        };
      }

      // Find student
      const student = state.users.find((u) => u.rollNo === studentRollNo) || {
        name: "Student (" + studentRollNo + ")",
        rollNo: studentRollNo,
        hostel: "IIIT-Bh Hostel"
      };

      const now = new Date();
      const timeStr = "Today, " + now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      const newScan = {
        tokenCode: tokenCode || "IIITB-" + Math.floor(1000 + Math.random() * 9000),
        studentName: student.name,
        rollNo: student.rollNo,
        hostel: student.hostel,
        meal: mealName,
        timestamp: timeStr,
        status: "Verified & Punched",
        counter: counterName || "Counter 1"
      };

      state.scannedTokens.unshift(newScan);
      saveState();
      return {
        success: true,
        message: "Token validated! Plate issued.",
        record: newScan
      };
    },

    // Inventory operations
    updateStock: (itemId, deltaAmount) => {
      const item = state.inventory.find((i) => i.id === itemId);
      if (item) {
        item.currentStock = Math.max(0, item.currentStock + deltaAmount);
        item.status = item.currentStock <= item.minThreshold ? "Low Stock" : "Normal";
        item.lastRestocked = "Today, " + new Date().toLocaleDateString("en-IN");
        saveState();
        return item;
      }
      return null;
    },

    addProcurement: (data) => {
      const id = "PO-" + Math.floor(9900 + Math.random() * 100);
      const newPo = {
        id,
        vendor: data.vendor,
        items: data.items,
        amount: Number(data.amount) || 0,
        date: new Date().toISOString().split("T")[0],
        invoiceNo: data.invoiceNo || "INV-" + Math.floor(1000 + Math.random() * 9000),
        paymentStatus: "Paid"
      };
      state.procurements.unshift(newPo);
      saveState();
      return newPo;
    },

    // Audit operations
    addAudit: (auditData) => {
      const id = "AUD-" + new Date().getFullYear() + "-W" + Math.floor(40 + Math.random() * 12);
      const total =
        auditData.scores.cleanlinessUtensils * 0.2 +
        auditData.scores.waterPurifierTDS * 0.2 +
        auditData.scores.foodTemperatureStorage * 0.2 +
        auditData.scores.staffHygieneGear * 0.2 +
        auditData.scores.wasteDisposalSegregation * 0.2;

      let grade = "A+ (Outstanding)";
      if (total < 75) grade = "C (Needs Immediate Improvement)";
      else if (total < 85) grade = "B (Satisfactory)";
      else if (total < 92) grade = "A (Good)";

      const newAudit = {
        id,
        date: new Date().toISOString().split("T")[0],
        messHall: auditData.messHall || "Central Mess",
        inspector: auditData.inspector || "Dr. P. K. Sahoo (Warden)",
        scores: auditData.scores,
        overallScore: Number(total.toFixed(1)),
        grade,
        remarks: auditData.remarks,
        fssaiCertExpiry: "2027-09-30"
      };

      state.audits.unshift(newAudit);
      saveState();
      return newAudit;
    },

    // Announcement operations
    addAnnouncement: (title, content, priority, category) => {
      const id = "ANN-" + Math.floor(300 + Math.random() * 700);
      const newAnn = {
        id,
        title,
        content,
        priority: priority || "Normal",
        category: category || "General",
        date: new Date().toISOString().split("T")[0],
        issuedBy: "Chief Warden Office"
      };
      state.announcements.unshift(newAnn);
      saveState();
      return newAnn;
    },

    // Reset database to initial seed
    resetToSeed: () => {
      state = JSON.parse(JSON.stringify(SEED_DATA));
      saveState();
      setCurrentUser(state.users[0]);
    },

    // Export database
    exportJSON: () => {
      return JSON.stringify(state, null, 2);
    },

    // Import database
    importJSON: (jsonStr) => {
      try {
        const parsed = JSON.parse(jsonStr);
        if (parsed.institution && parsed.users) {
          state = parsed;
          saveState();
          return true;
        }
      } catch (e) {
        console.error("Invalid JSON import:", e);
      }
      return false;
    }
  };
})();
