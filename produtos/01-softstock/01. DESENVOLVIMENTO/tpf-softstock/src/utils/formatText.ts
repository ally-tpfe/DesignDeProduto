export function formatText(text: string): string {
  const formattedText = text.split('/').pop();
  if (formattedText === undefined) {
    return text;
  }
  switch (formattedText) {
    case 'inicio':
      return 'Início';
    case 'softwares':
      return 'Softwares';
    case 'licenses':
      return 'Licenças';
    case 'panels':
      return 'Painéis';
    case 'equipe':
      return 'Equipe';
    case 'dashboard':
      return 'Dashboard';
    default:
      return formattedText;
  }
}

export function formatDate(date: Date): string {
  const formattedDate = new Date(date).toLocaleDateString('pt-BR');
  return formattedDate;
}
export const formatDateForInput = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function formatMoney(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}