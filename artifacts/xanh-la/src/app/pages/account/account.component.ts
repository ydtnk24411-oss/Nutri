import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService } from '../../shared/services/cart.service';
import { XanhLaAddress } from '../../shared/models/xanh-la.models';

type Tab = 'account' | 'addresses' | 'wallet';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, ShellComponent],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent implements OnInit {
  protected cart   = inject(CartService);
  private router   = inject(Router);

  // ── Tab ──────────────────────────────────────
  activeTab = signal<Tab>('account');

  // ── My Account form ──────────────────────────
  displayName = signal('');
  firstName   = signal('');
  lastName    = signal('');
  phone       = signal('');
  title       = signal('');
  saved       = signal(false);
  saving      = signal(false);

  // ── My Addresses ─────────────────────────────
  showAddressForm = signal(false);
  addrLabel    = signal('Nhà riêng');
  addrFullName = signal('');
  addrPhone    = signal('');
  addrAddress  = signal('');
  addrCity     = signal('');
  addrDefault  = signal(false);

  ngOnInit(): void {
    const u = this.cart.currentUser();
    if (!u) { this.router.navigate(['/']); return; }
    this.displayName.set(u.name ?? '');
    this.firstName.set(u.firstName ?? '');
    this.lastName.set(u.lastName ?? '');
    this.phone.set(u.phone ?? '');
    this.title.set(u.title ?? '');
    // Pre-fill address form name
    this.addrFullName.set(u.name ?? '');
    this.addrPhone.set(u.phone ?? '');
  }

  // ── Save account info ────────────────────────
  saveAccount(e: Event): void {
    e.preventDefault();
    this.saving.set(true);
    // Build full display name từ firstName + lastName nếu có
    const fullName = [this.firstName(), this.lastName()].filter(Boolean).join(' ') || this.displayName();
    this.cart.updateUser({
      name:      fullName,
      firstName: this.firstName(),
      lastName:  this.lastName(),
      phone:     this.phone(),
      title:     this.title(),
    });
    setTimeout(() => {
      this.saving.set(false);
      this.saved.set(true);
      setTimeout(() => this.saved.set(false), 3000);
    }, 400);
  }

  cancelAccount(): void {
    const u = this.cart.currentUser();
    if (!u) return;
    this.displayName.set(u.name ?? '');
    this.firstName.set(u.firstName ?? '');
    this.lastName.set(u.lastName ?? '');
    this.phone.set(u.phone ?? '');
    this.title.set(u.title ?? '');
  }

  // ── Addresses ────────────────────────────────
  addAddress(e: Event): void {
    e.preventDefault();
    if (!this.addrFullName() || !this.addrAddress()) return;
    const addr: XanhLaAddress = {
      id:        Date.now().toString(),
      label:     this.addrLabel(),
      fullName:  this.addrFullName(),
      phone:     this.addrPhone(),
      address:   this.addrAddress(),
      city:      this.addrCity(),
      isDefault: this.addrDefault(),
    };
    this.cart.addAddress(addr);
    this.resetAddressForm();
    this.showAddressForm.set(false);
  }

  removeAddress(id: string): void {
    if (confirm('Xóa địa chỉ này?')) this.cart.removeAddress(id);
  }

  setDefault(id: string): void {
    const addrs = (this.cart.currentUser()?.addresses ?? []).map(a => ({
      ...a, isDefault: a.id === id,
    }));
    this.cart.updateUser({ addresses: addrs });
  }

  private resetAddressForm(): void {
    this.addrLabel.set('Nhà riêng');
    this.addrAddress.set('');
    this.addrCity.set('');
    this.addrDefault.set(false);
  }

  // ── Logout ───────────────────────────────────
  logout(): void {
    this.cart.logout();
    this.router.navigate(['/']);
  }

  // ── Utils ────────────────────────────────────
  avatarChar(): string {
    return (this.cart.currentUser()?.name ?? 'U').charAt(0).toUpperCase();
  }

  maskPassword(): string { return '••••••'; }
}
