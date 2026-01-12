export type InvoiceType = {
    id?: number;
    yearId?: number;
    institutionId?: number;
    userId?: number;
    reference?: 'string'
    product: 'string';
    amount: number;
    dueDate: 'string';
    status: 'string';
    createdBy?: number;
    updatedBy?: number;
}

export type InvoiceFormType = {
    id?: number;
    yearId?: number;
    institutionId?: number;
    userId?: number;
    product: 'string';
    amount: number;
    dueDate: 'string';
    status: 'string';
    createdBy?: number;
    updatedBy?: number;
}