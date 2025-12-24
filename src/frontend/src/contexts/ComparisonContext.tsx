import { createContext, useContext, useState, type ReactNode } from 'react';

interface ComparisonContextType {
    selectedMajors: any[];
    addToComparison: (major: any) => void;
    removeFromComparison: (majorId: string) => void;
    clearComparison: () => void;
    isInComparison: (majorId: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const ComparisonProvider = ({ children }: { children: ReactNode }) => {
    const [selectedMajors, setSelectedMajors] = useState<any[]>([]);

    const addToComparison = (major: any) => {
        if (selectedMajors.length < 3 && !isInComparison(major._id)) {
            setSelectedMajors([...selectedMajors, major]);
        }
    };

    const removeFromComparison = (majorId: string) => {
        setSelectedMajors(selectedMajors.filter(m => m._id !== majorId));
    };

    const clearComparison = () => {
        setSelectedMajors([]);
    };

    const isInComparison = (majorId: string) => {
        return selectedMajors.some(m => m._id === majorId);
    };

    return (
        <ComparisonContext.Provider value={{
            selectedMajors,
            addToComparison,
            removeFromComparison,
            clearComparison,
            isInComparison
        }}>
            {children}
        </ComparisonContext.Provider>
    );
};

export const useComparison = () => {
    const context = useContext(ComparisonContext);
    if (!context) {
        throw new Error('useComparison must be used within ComparisonProvider');
    }
    return context;
};
