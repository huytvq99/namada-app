export const uniqueId = (prefix?: string): string => {
    const uniquePart = Math.random().toString(36).substring(2, 11); // Generate a random alphanumeric string
    return prefix ? `${prefix}_${uniquePart}` : uniquePart;
};

export const hiddenBlockId = (
    blockId: string,
    numberShow?: number,
    isNotUpperCase?: boolean,
) => {
    let blockIdUp = blockId;
    if (!isNotUpperCase) {
        blockIdUp = blockId?.toUpperCase() || '';
    }

    const characterShow = numberShow || 12;
    const partNumberShow = characterShow / 2;
    if (blockIdUp?.length <= characterShow) return blockIdUp;
    return `${blockIdUp.slice(0, partNumberShow)}...${blockIdUp.slice(
        -partNumberShow,
    )}`;
};

export function formatPercent(number: number): string {
    if (isNaN(number)) {
        return 'NaN%';
    }

    // Convert the number to a percentage with two decimal places
    const formattedPercent = (number * 100).toFixed(2);

    return `${formattedPercent}%`;
}

export function formatNumber(number: number, decimal?: number): string {
    // Check if the input is a valid number
    if (isNaN(number)) {
        return 'NaN';
    }

    // Round the number to two decimal places
    const roundedNumber: number = Math.round(number * 100) / 100;

    // Convert the number to a string with commas as thousand separators
    const formattedNumber: string = roundedNumber.toLocaleString('en-US', {
        minimumFractionDigits: decimal || 1,
        maximumFractionDigits: decimal || 1,
    });

    return formattedNumber;
}
