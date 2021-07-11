export default interface historyType {
  id: number;
  timestamp: number;
  fileName: string;
  converted: number;
  finished: number;
  total: number;
}

export interface pdfHistoryType {
  id: number;
  timestamp: number;
  fileName: string;
  key: string;
  location: string;
  status: string;
  total: number;
}
