import  { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface EventsContextType {
    requestCount: number;
    incrementRequestCount: () => void;
    resetRequestCount: () => void;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const useEvents = (): EventsContextType => {
    const context = useContext(EventsContext);
    if (!context) {
        throw new Error('useEvents must be used within an EventsProvider');
    }
    return context;
};

interface EventsProviderProps {
    children: ReactNode;
}
export const EventsProvider: React.FC<EventsProviderProps> = ({ children }) => {
    const [requestCount, setRequestCount] = useState<number>(0);

    const incrementRequestCount = () => {
        setRequestCount(prevCount => prevCount + 1);
    };
    const resetRequestCount = () => {
        useEffect(() => {
            setRequestCount(0);
        }
    , []); 
    }

    return (
        <EventsContext.Provider value={{ requestCount, incrementRequestCount, resetRequestCount }}>
            {children}
        </EventsContext.Provider>
    );
};
export default EventsProvider;
