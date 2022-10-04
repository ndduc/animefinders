export interface AnimePaginationModel  {
    current_page: number;
    has_next_page: boolean;
    last_visible_page: number;
    items: AnimePaginationItem;
}

export interface AnimePaginationItem {
    count: number;
    per_page: number;
    total: number
}