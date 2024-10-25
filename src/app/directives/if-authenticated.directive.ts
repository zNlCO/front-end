import { Directive, OnInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {
  protected destroyed$ = new Subject<void>();
  protected isVisible = false;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    protected authSrv: AuthService
  ) { }

  ngOnInit() {
    this.authSrv.currentUser$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(_ => {
        this.updateView();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private updateView() {
    if (this.authSrv.isLoggedIn()) {
      if (!this.isVisible) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isVisible = true;
      }
    } else {
      this.viewContainer.clear();
      this.isVisible = false;
    }
  }
}

