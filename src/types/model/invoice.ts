export type InvoiceType = {
    id?: number;
    yearId?: number;
    institutionId?: number;
    userId?: number;
    reference?: string
    product: string;
    amount: string;
    dueDate: string;
    status: string;
    createdBy?: number;
    updatedBy?: number;
}