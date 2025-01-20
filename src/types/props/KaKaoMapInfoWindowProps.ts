export interface KaKaoMapInfoWindowProps {
    position: any;
    setInfoWindowState: React.Dispatch<React.SetStateAction<{ isOpen: boolean }[]>>;
    index: number;
  }