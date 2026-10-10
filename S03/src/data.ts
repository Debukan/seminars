export interface Product {
    id: number
    title: string
    price: number
    inStock: boolean
}

export const products: Product[] = Array.from({length: 5000}, (_, i) => ({
    id: i + 1,
    title: `Товар ${i + 1}`,
    price: 100 + (i % 50) * 10,
    inStock: i % 3 !== 0,
}))

export function filterProducts(query: string, onlyInStock: boolean): Product[] {
    const normalized = query.trim().toLowerCase()

    return products.filter((product) => {
        const matchesTitle = product.title.toLowerCase().includes(normalized)
        const matchesStock = !onlyInStock || product.inStock
        return matchesTitle && matchesStock
    })
}
