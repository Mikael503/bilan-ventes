export function totalRevenue(carts) {
    return carts.reduce(
        (total, cart) => total + cart.discountedTotal,
        0
    );
}

export function revenueByCategory(carts, products) {
    const productCategories = new Map(
        products.map(product => [product.id, product.category])
    );

    const revenues = new Map();

    for (const cart of carts) {
        for (const item of cart.products) {
            const category = productCategories.get(item.id);

            if (!category) continue;

            revenues.set(
                category,
                (revenues.get(category) || 0) + item.discountedTotal
            );
        }
    }

    return [...revenues.entries()]
        .map(([category, revenue]) => ({
            category,
            revenue,
        }))
        .sort((a, b) => b.revenue - a.revenue);
}

export function topProducts(carts, count = 5) {
    const quantities = new Map();

    for (const cart of carts) {
        for (const item of cart.products) {
            quantities.set(
                item.title,
                (quantities.get(item.title) || 0) + item.quantity
            );
        }
    }

    return [...quantities.entries()]
        .map(([title, quantity]) => ({
            title,
            quantity,
        }))
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, count);
}

export function bestCustomer(carts, users) {
    if (carts.length === 0) return null;

    const mostExpensiveCart = carts.reduce(
        (best, cart) =>
            cart.discountedTotal > best.discountedTotal
                ? cart
                : best
    );

    const user = users.find(
        user => user.id === mostExpensiveCart.userId
    );

    if (!user) return null;

    return {
        name: `${user.firstName} ${user.lastName}`,
        spent: mostExpensiveCart.discountedTotal,
    };
}