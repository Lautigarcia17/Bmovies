export type ScrollContextType = {
     scrollRef: React.RefObject<HTMLDivElement>,
     scrollPosition : number,
     setScrollPosition: React.Dispatch<React.SetStateAction<number>>;
};