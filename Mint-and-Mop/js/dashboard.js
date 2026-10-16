/* ===================================================================
   Mint & Mop - Admin Dashboard JavaScript
   Sidebar Toggles, Table Filtering, Search, Modals, and Charts
   =================================================================== */

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // --- 1. SIDEBAR TOGGLE (Mobile / Tablet) ---
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebar = document.querySelector('.admin-sidebar');
  if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', function () {
      sidebar.classList.toggle('show');
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        if (!sidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target) && sidebar.classList.contains('show')) {
          sidebar.classList.remove('show');
        }
      }
    });
  }

  // --- 2. TABLE SEARCH & STATUS FILTER ---
  const bookingSearch = document.getElementById('bookingSearchInput');
  const statusFilter = document.getElementById('statusFilterSelect');
  const tableRows = document.querySelectorAll('.booking-table-row');

  function filterBookings() {
    const query = bookingSearch ? bookingSearch.value.toLowerCase().trim() : '';
    const status = statusFilter ? statusFilter.value.toLowerCase() : 'all';

    tableRows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const rowStatus = row.getAttribute('data-status') || '';

      const matchesQuery = !query || text.includes(query);
      const matchesStatus = status === 'all' || rowStatus.toLowerCase() === status;

      if (matchesQuery && matchesStatus) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  if (bookingSearch) bookingSearch.addEventListener('input', filterBookings);
  if (statusFilter) statusFilter.addEventListener('change', filterBookings);

  // --- 3. QUICK VIEW / EDIT ACTION MODAL SIMULATION ---
  document.querySelectorAll('.btn-view-booking').forEach(btn => {
    btn.addEventListener('click', function () {
      const clientName = this.getAttribute('data-client') || 'Client';
      const service = this.getAttribute('data-service') || 'Inspection';
      const date = this.getAttribute('data-date') || 'Today';
      const status = this.getAttribute('data-status') || 'Pending';

      alert(`Booking Details:\nClient: ${clientName}\nService: ${service}\nScheduled Date: ${date}\nStatus: ${status}`);
    });
  });

  // --- 4. TABS NAVIGATION FOR DASHBOARD SECTIONS ---
  const navLinks = document.querySelectorAll('.sidebar-nav-tab');
  const contentSections = document.querySelectorAll('.dashboard-tab-content');

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-tab');

      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      contentSections.forEach(section => {
        if (section.id === targetId) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });

      // Close sidebar on mobile after clicking
      if (window.innerWidth < 992 && sidebar) {
        sidebar.classList.remove('show');
      }
    });
  });

  // --- 5. SIMPLE REVENUE BAR CHART (SVG Canvas) ---
  const chartCanvas = document.getElementById('revenueChartCanvas');
  if (chartCanvas && chartCanvas.getContext) {
    const ctx = chartCanvas.getContext('2d');
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const values = [18500, 24200, 29800, 31400, 42000, 48500, 53200, 59000, 64500, 71200];
    const maxVal = 80000;

    function drawChart() {
      const w = chartCanvas.width = chartCanvas.parentElement.clientWidth;
      const h = chartCanvas.height = 240;
      ctx.clearRect(0, 0, w, h);

      const paddingLeft = 40;
      const paddingBottom = 30;
      const graphW = w - paddingLeft - 20;
      const graphH = h - paddingBottom - 20;
      const barW = Math.max(12, Math.min(36, graphW / months.length - 12));

      // Grid lines
      ctx.strokeStyle = isDark ? '#1e293b' : '#e2e8f0';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = 20 + (graphH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(w - 20, y);
        ctx.stroke();
      }

      // Draw Bars
      months.forEach((m, idx) => {
        const x = paddingLeft + (idx * (graphW / months.length)) + 10;
        const val = values[idx];
        const barH = (val / maxVal) * graphH;
        const y = 20 + graphH - barH;

        // Gradient
        const grad = ctx.createLinearGradient(0, y, 0, y + barH);
        grad.addColorStop(0, '#0284c7');
        grad.addColorStop(1, '#0d9488');

        ctx.fillStyle = grad;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(x, y, barW, barH, [6, 6, 0, 0]);
        } else {
          ctx.rect(x, y, barW, barH);
        }
        ctx.fill();

        // Month labels
        ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(m, x + barW / 2, h - 10);
      });
    }

    drawChart();
    window.addEventListener('resize', drawChart);
  }
});
