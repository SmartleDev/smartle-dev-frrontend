export function isNull(item: any) {
    if (item == null) return true;
    if (item === undefined) return true;
    let type = typeof item;    
    if (type === 'object' && !Array.isArray(item)) {        
        if (!item) return true;
        if (Object.keys(item).length === 0) return true;
        else return false;
    } else {                
        if (!item) return true;
        if (item == null) return true;
        if (item === []) return true;
        if (item.length === 0) return true;
        else return false;
    }
}

export const toTitleCase = (str: string) => {
    if (isNull(str)) return;	
	return str?.toLowerCase().replace(/(^|\s)(\w)/g, (x) => x.toUpperCase());
};

export function cleanText(text: string, redo = false) {
    if (isNull(text)) return;
    if (redo) {
        return text.toLowerCase()
            .replaceAll(/_q_/g, "'")
            .replaceAll(/_d_/g, '.')            
            .replaceAll(/_/g, ' ') as string;
    } else {
        return text.toLowerCase()
            .replaceAll(/'/g, '_q_')
            .replaceAll(/\./g, '_d_')
            .replaceAll(/’/g, '_q_')
            .replaceAll(/ +/g, '_') as string;
    }
}