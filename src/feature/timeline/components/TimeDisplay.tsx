interface TimeDisplayProps {
    date: string;
}

export function TimeDisplay({ date }: TimeDisplayProps) {
    const dateObj = new Date(date);
    
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    
    const formattedTime = dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <div className="flex-shrink-0 w-32 text-sm font-bold font-mono text-muted-foreground/80 pt-1 whitespace-nowrap">
            <div className="text-xs font-normal">{formattedTime}</div>
            <div>{formattedDate}</div>
        </div>
    );
}
