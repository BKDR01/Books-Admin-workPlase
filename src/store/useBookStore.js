import { create } from 'zustand';

const useBookStore = create((set) => ({
    formDataList: [{}],
    files: {},

    addForm: () => set((state) => ({
        formDataList: [...state.formDataList, {}],
    })),

    updateFormData: (index, key, value) => set((state) => {
        const updated = [...state.formDataList];
        updated[index] = { ...updated[index], [key]: value };
        return { formDataList: updated };
    }),

    addFile: (formIndex, fileType, file) => set((state) => {
        const updated = { ...state.files };
        updated[formIndex] = {
            ...updated[formIndex],
            [fileType]: file,
        };
        return { files: updated };
    }),

    removeFile: (formIndex, fileType) => set((state) => {
        const updated = { ...state.files };
        if (updated[formIndex]) {
            delete updated[formIndex][fileType];
        }
        return { files: updated };
    }),

    resetAll: () => set({
        formDataList: [{}],
        files: {},
    }),
}));

export default useBookStore;