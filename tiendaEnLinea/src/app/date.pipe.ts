import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true // Marca el Pipe como independiente, útil si lo usas en módulos independientes
})
export class DatePipe implements PipeTransform {
  transform(value: unknown, format: string = 'dd/MM/yyyy'): string | null {
    if (!value) return null;

    const date = new Date(value as string); // Convierte el valor a una fecha
    if (isNaN(date.getTime())) return null; // Verifica si la fecha es válida

    // Formatear según el formato especificado
    const options: Intl.DateTimeFormatOptions = this.getFormatOptions(format);
    return new Intl.DateTimeFormat('es-MX', options).format(date); // Cambia 'es-MX' según la región deseada
  }

  private getFormatOptions(format: string): Intl.DateTimeFormatOptions {
    switch (format) {
      case 'dd/MM/yyyy':
        return { day: '2-digit', month: '2-digit', year: 'numeric' };
      case 'MM/dd/yyyy':
        return { month: '2-digit', day: '2-digit', year: 'numeric' };
      case 'full':
        return { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
      case 'short':
        return { day: 'numeric', month: 'short', year: 'numeric' };
      default:
        return { day: '2-digit', month: '2-digit', year: 'numeric' };
    }
  }
}
