import { Component, signal, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShellComponent } from '../../components/shell/shell.component';
import { CartService } from '../../shared/services/cart.service';
import { ProductApiService, ApiProduct } from '../../shared/services/product-api.service';
import { XanhLaProduct } from '../../shared/models/xanh-la.models';

function toCartProduct(p: ApiProduct): XanhLaProduct {
  return {
    id: p._id, name: p.name, slug: p.slug, price: p.price,
    priceNumber: p.priceNumber, image: p.image,
    category: p.category as 'Vegetables' | 'Fruits' | 'Meat',
    categoryVi: p.categoryVi, description: p.description,
    container: p.container, cutType: p.cutType, cutting: p.cutting,
    packSize: p.packSize, packaging: p.packaging, preparation: p.preparation,
    quantity: p.quantity, ripeness: p.ripeness, sizeGroup: p.sizeGroup,
    thickness: p.thickness, type: p.type, weight: p.weight,
    options: p.options,
  };
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ShellComponent, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css',
})
export class ProductDetailComponent implements OnInit {
  protected cart       = inject(CartService);
  private route        = inject(ActivatedRoute);
  private router       = inject(Router);
  private productApi   = inject(ProductApiService);

  protected product    = signal<ApiProduct | null>(null);
  protected loading    = signal(true);
  protected error      = signal('');
  protected quantity   = signal(1);
  protected selectedRipeness = signal('Ready to Eat');
  protected openAccordions   = signal({ info: true, refund: false, shipping: false });

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    // Thử slug trực tiếp, backend hỗ trợ cả dạng slug thuần và /product-page/xxx
    this.productApi.getBySlug(slug).subscribe({
      next: (res) => { this.product.set(res.data); this.loading.set(false); },
      error: () => {
        // Thử thêm prefix nếu slug trực tiếp không tìm thấy
        const prefixed = slug.startsWith('/product-page/') ? slug.replace('/product-page/', '') : slug;
        this.productApi.getBySlug(prefixed).subscribe({
          next: (r) => { this.product.set(r.data); this.loading.set(false); },
          error: () => { this.error.set('Không tìm thấy sản phẩm.'); this.loading.set(false); },
        });
      },
    });
  }

  dec(): void { this.quantity.update(q => Math.max(1, q - 1)); }
  inc(): void { this.quantity.update(q => q + 1); }

  toggleAccordion(k: 'info' | 'refund' | 'shipping'): void {
    this.openAccordions.update(o => ({ ...o, [k]: !o[k] }));
  }

  addToCart(): void {
    const p = this.product();
    if (p) this.cart.addItem(toCartProduct(p), this.quantity(), this.selectedRipeness());
  }

  buyNow(): void {
    this.addToCart();
    this.router.navigate(['/checkout']);
  }
}
