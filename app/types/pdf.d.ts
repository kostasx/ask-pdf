export interface PDFData {
  name: string;
  url: string;
}

export interface PDFSimilarityData {
  id: number;
  content: string;
  metadata: string;
  distance: number;
}

export interface PDFProps {
  className?: string;
  documents: PDFData[];
}

export interface PDFSelectProps {
  documents: PDFData[];
}
