import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardApiService, DashboardStats } from '../../shared/services/dashboard-api.service';

export interface BarItem { label: string; revenue: number; }
export interface LinePoint { month: string; count: number; }

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  private dashApi = inject(DashboardApiService);

  stats       = signal<DashboardStats | null>(null);
  barData     = signal<BarItem[]>([]);
  lineData    = signal<LinePoint[]>([]);
  loading     = signal(true);
  error       = signal('');

  readonly orderStatusMap: Record<string, string> = {
    pending:   'Chờ xử lý',
    confirmed: 'Đã xác nhận',
    preparing: 'Đang chuẩn bị',
    shipping:  'Đang giao',
    delivered: 'Đã giao',
    cancelled: 'Đã hủy',
  };

  readonly overviewCards = [
    { key: 'totalOrders',   label: 'Đơn hôm nay',       sub: '+12% so với hôm qua',      subColor: '#b8860b', route: '/admin/orders',  isRevenue: false },
    { key: 'totalRevenue',  label: 'Doanh thu tuần này', sub: '+8% so với tuần trước',    subColor: '#b8860b', route: '/admin/orders',  isRevenue: true  },
    { key: 'pendingOrders', label: 'Đơn đang xử lý',     sub: 'Cần hoàn thành trước 17h', subColor: '#555',    route: '/admin/orders',  isRevenue: false },
    { key: 'totalUsers',    label: 'Khách mới',           sub: '+15% tháng này',           subColor: '#b8860b', route: '/admin/users',   isRevenue: false },
  ];

  ngOnInit(): void {
    // Load stats
    this.dashApi.getStats().subscribe({
      next: (res) => { this.stats.set(res.data); this.loading.set(false); },
      error: (err) => { this.error.set(err.error?.message || 'Không thể tải dữ liệu.'); this.loading.set(false); },
    });

    // Load bar chart: doanh thu theo danh mục từ DB
    this.dashApi.getRevenueByCategory().subscribe({
      next: (res) => { this.barData.set(res.data); },
      error: () => {}, // silently fail — chart chỉ trống
    });

    // Load line chart: doanh thu theo tháng
    this.dashApi.getRevenue().subscribe({
      next: (res) => {
        const months = ['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];
        const points: LinePoint[] = res.data.map(d => ({
          month: `Tháng ${d._id.month}`,
          count: d.revenue,
        }));
        this.lineData.set(points.length > 0 ? points : [
          { month: 'Tháng 1', count: 0 },
          { month: 'Tháng 2', count: 0 },
          { month: 'Tháng 3', count: 0 },
          { month: 'Tháng 4', count: 0 },
        ]);
      },
      error: () => {
        this.lineData.set([
          { month: 'Tháng 1', count: 0 },
          { month: 'Tháng 2', count: 0 },
          { month: 'Tháng 3', count: 0 },
          { month: 'Tháng 4', count: 0 },
        ]);
      },
    });
  }

  statValue(key: string): number {
    const s = this.stats();
    if (!s) return 0;
    return (s as unknown as Record<string, number>)[key] ?? 0;
  }

  formatBig(val: number): string {
    if (val >= 1_000_000) return (val / 1_000_000).toFixed(1) + 'M';
    if (val >= 1_000)     return (val / 1_000).toFixed(1) + 'K';
    return val.toString();
  }

  formatPrice(val: number): string {
    return val.toLocaleString('vi-VN') + ' ₫';
  }

  // Tính chiều cao bar theo tỉ lệ (max = 160px)
  barHeight(revenue: number): number {
    const vals = this.barData().map(b => b.revenue);
    const max  = Math.max(...vals, 1);
    return Math.max(Math.round((revenue / max) * 140), 4);
  }

  // Alternating highlight: bar chẵn (index 1, 3, ...) màu nhạt
  isHighlight(index: number): boolean {
    return index % 2 === 1;
  }

  // SVG polyline points cho line chart
  get linePoints(): string {
    const data = this.lineData();
    if (data.length < 2) return '';
    const W = 400, H = 90;
    const maxV = Math.max(...data.map(d => d.count), 1);
    return data.map((d, i) => {
      const x = (i / (data.length - 1)) * (W - 40) + 20;
      const y = d.count === 0
        ? H / 2                                        // flat line khi không có data
        : H - (d.count / maxV) * (H - 20) - 10;
      return `${x},${y}`;
    }).join(' ');
  }
}
