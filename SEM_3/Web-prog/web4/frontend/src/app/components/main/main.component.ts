import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ResultService } from '../../services/result.service';
import { ResultResponse, PointRequest } from '../../models/result.model';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    TableModule,
    CardModule,
    MessageModule
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  
  form: FormGroup;
  results: ResultResponse[] = [];
  user: any;
  errorMessage = '';
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private currentR = 1;
  private resizeObserver?: ResizeObserver;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private resultService: ResultService,
    private router: Router
  ) {
    this.form = this.fb.group({
      x: ['', [Validators.required, Validators.min(-5), Validators.max(5)]],
      y: ['', [Validators.required, Validators.min(-3), Validators.max(3)]],
      r: ['', [Validators.required, Validators.min(-5), Validators.max(5)]]
    });
  }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    const token = this.authService.getToken();
    if (!token) {
      console.error('MainComponent: Token missing in ngOnInit, redirecting to login');
      this.authService.logout();
      this.router.navigate(['/login']);
      return;
    }
    console.log('MainComponent: Token present, loading results');
    this.loadResults();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initCanvas();
      this.setupResizeObserver();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  initCanvas(): void {
    if (this.canvasRef?.nativeElement) {
      this.canvas = this.canvasRef.nativeElement;
      this.ctx = this.canvas.getContext('2d');
      this.setCanvasSize();
      this.drawPlot();
      this.setupCanvasClick();
    }
  }

  setCanvasSize(): void {
    if (!this.canvas) return;
    const container = this.canvas.parentElement;
    if (container) {
      const size = Math.min(container.clientWidth - 40, 500);
      this.canvas.width = size;
      this.canvas.height = size;
    }
  }

  setupResizeObserver(): void {
    if (typeof ResizeObserver !== 'undefined' && this.canvas?.parentElement) {
      this.resizeObserver = new ResizeObserver(() => {
        this.setCanvasSize();
        this.drawPlot();
      });
      this.resizeObserver.observe(this.canvas.parentElement);
    }
  }

  setupCanvasClick(): void {
    if (!this.canvas) return;
    this.canvas.addEventListener('click', (e) => this.onCanvasClick(e));
  }

  onCanvasClick(event: MouseEvent): void {
    if (!this.canvas || !this.ctx) return;
    
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const scale = 200 / this.currentR;
    
    const coordX = (x - centerX) / scale;
    const coordY = (centerY - y) / scale;
    
    this.form.patchValue({
      x: Math.round(coordX * 100) / 100,
      y: Math.round(coordY * 100) / 100,
      r: this.currentR
    });
    
    this.submitPoint();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitPoint();
    }
  }

  submitPoint(): void {
    if (!this.form.valid) return;
    
    // Проверка аутентификации перед запросом
    if (!this.authService.isAuthenticated()) {
      this.errorMessage = 'Вы не авторизованы. Пожалуйста, войдите в систему.';
      this.router.navigate(['/login']);
      return;
    }
    
    const token = this.authService.getToken();
    console.log('MainComponent: submitPoint - Token check:', token ? 'EXISTS (' + token.length + ' chars)' : 'MISSING');
    console.log('MainComponent: submitPoint - About to send POST request');
    
    const request: PointRequest = this.form.value;
    console.log('MainComponent: submitPoint - Request data:', request);
    this.currentR = request.r;
    
    this.resultService.checkPoint(request).subscribe({
      next: (result) => {
        console.log('MainComponent: submitPoint - Success, result:', result);
        this.results.unshift(result);
        this.drawPlot();
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('MainComponent: submitPoint - Error:', err);
        console.error('MainComponent: submitPoint - Error status:', err.status);
        console.error('MainComponent: submitPoint - Token at error time:', this.authService.getToken() ? 'EXISTS' : 'MISSING');
        
        // Обработка 403 Forbidden - неавторизованный запрос
        if (err.status === 403) {
          this.errorMessage = 'Доступ запрещен. Проверьте, что вы авторизованы.';
          console.error('MainComponent: submitPoint - 403 error, check if token was sent');
          // Не удаляем токен сразу - пусть интерцептор разберется
        } else {
          this.errorMessage = err.error?.message || 'Ошибка при проверке точки';
        }
      }
    });
  }

  onRChange(): void {
    const rValue = this.form.get('r')?.value;
    if (rValue && rValue > 0) {
      this.currentR = rValue;
      this.drawPlot();
    }
  }

  clearResults(): void {
    this.resultService.clearResults().subscribe({
      next: () => {
        this.results = [];
        this.drawPlot();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Ошибка при очистке результатов';
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadResults(): void {
    if (!this.authService.isAuthenticated()) {
      console.error('MainComponent: Not authenticated, redirecting to login');
      this.router.navigate(['/login']);
      return;
    }
    
    const token = this.authService.getToken();
    console.log('MainComponent: About to load results, token:', token ? token.substring(0, 20) + '...' : 'MISSING');
    console.log('MainComponent: Token from localStorage:', localStorage.getItem('auth_token') ? 'EXISTS' : 'MISSING');
    
    this.resultService.getResults().subscribe({
      next: (results) => {
        this.results = results;
        if (results.length > 0) {
          this.currentR = results[0].r || 1;
          this.form.patchValue({ r: this.currentR });
        }
        setTimeout(() => this.drawPlot(), 100);
      },
      error: (err) => {
        console.error('MainComponent: Error loading results:', err);
        console.error('MainComponent: Error status:', err.status);
        console.error('MainComponent: Token at error time:', this.authService.getToken() ? 'EXISTS' : 'MISSING');
        
        if (err.status === 403) {
          // Не удаляем токен сразу - пусть интерцептор разберется
          // Проверяем, был ли токен в запросе
          this.errorMessage = 'Доступ запрещен. Проверьте, что вы авторизованы.';
          console.error('MainComponent: 403 error - check if token was sent in request');
        } else {
          this.errorMessage = err.error?.message || 'Ошибка при загрузке результатов';
        }
      }
    });
  }

  drawPlot(): void {
    if (!this.canvas || !this.ctx) return;
    
    const width = this.canvas.width;
    const height = this.canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 200;
    const scale = radius / this.currentR;
    
    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);
    
    // Draw area
    this.drawArea(centerX, centerY, scale);
    
    // Draw axes
    this.drawAxes(centerX, centerY, width, height);
    
    // Draw labels
    this.drawLabels(centerX, centerY, scale);
    
    // Draw points
    this.drawPoints(centerX, centerY, scale);
  }

  drawArea(centerX: number, centerY: number, scale: number): void {
    if (!this.ctx) return;
    
    const R = this.currentR;
    
    this.ctx.fillStyle = 'rgba(30, 144, 255, 0.4)';
    this.ctx.strokeStyle = '#1E90FF';
    this.ctx.lineWidth = 2;
    
    // Triangle (x >= 0, y >= 0, x + y <= R)
    this.ctx.beginPath();
    this.ctx.moveTo(centerX, centerY);
    this.ctx.lineTo(centerX + R * scale, centerY);
    this.ctx.lineTo(centerX, centerY - R * scale);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    
    // Circle (x <= 0, y <= 0, x² + y² <= (R/2)²)
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, (R / 2) * scale, Math.PI, Math.PI / 2, true);
    this.ctx.lineTo(centerX, centerY);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();
    
    // Rectangle (x >= 0, x <= R/2, y <= 0, y >= -R)
    this.ctx.beginPath();
    this.ctx.rect(centerX, centerY, (R / 2) * scale, R * scale);
    this.ctx.fill();
    this.ctx.stroke();
  }

  drawAxes(centerX: number, centerY: number, width: number, height: number): void {
    if (!this.ctx) return;
    
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    
    // X axis
    this.ctx.beginPath();
    this.ctx.moveTo(0, centerY);
    this.ctx.lineTo(width, centerY);
    this.ctx.lineTo(width - 10, centerY - 5);
    this.ctx.moveTo(width, centerY);
    this.ctx.lineTo(width - 10, centerY + 5);
    
    // Y axis
    this.ctx.moveTo(centerX, height);
    this.ctx.lineTo(centerX, 0);
    this.ctx.lineTo(centerX - 5, 10);
    this.ctx.moveTo(centerX, 0);
    this.ctx.lineTo(centerX + 5, 10);
    
    this.ctx.stroke();
  }

  drawLabels(centerX: number, centerY: number, scale: number): void {
    if (!this.ctx) return;
    
    const R = this.currentR;
    const rStep = R * scale;
    const rHalf = (R / 2) * scale;
    
    this.ctx.fillStyle = 'black';
    this.ctx.font = '14px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText(R.toString(), centerX + rStep, centerY + 5);
    this.ctx.fillText((R/2).toString(), centerX + rHalf, centerY + 5);
    this.ctx.fillText((-R).toString(), centerX - rStep, centerY + 5);
    this.ctx.fillText((-R/2).toString(), centerX - rHalf, centerY + 5);
    
    this.ctx.textAlign = 'right';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText(R.toString(), centerX - 5, centerY - rStep);
    this.ctx.fillText((R/2).toString(), centerX - 5, centerY - rHalf);
    this.ctx.fillText((-R).toString(), centerX - 5, centerY + rStep);
    this.ctx.fillText((-R/2).toString(), centerX - 5, centerY + rHalf);
    
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText('X', this.canvas!.width - 15, centerY - 10);
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'top';
    this.ctx.fillText('Y', centerX + 10, 15);
  }

  drawPoints(centerX: number, centerY: number, scale: number): void {
    if (!this.ctx) return;
    
    this.results.forEach(result => {
      const pointScale = 200 / result.r;
      const pixelX = centerX + result.x * pointScale;
      const pixelY = centerY - result.y * pointScale;
      
      this.ctx!.fillStyle = result.result ? '#09a53d' : '#a50909';
      this.ctx!.beginPath();
      this.ctx!.arc(pixelX, pixelY, 5, 0, 2 * Math.PI);
      this.ctx!.fill();
    });
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('ru-RU');
  }
}


