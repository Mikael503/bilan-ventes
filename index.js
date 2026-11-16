import {ApiError} from "./src/errors.js";

import { getCarts, getProducts, getUsers } from "./src/api.js";

import {
    totalRevenue,
    revenueByCategory,
    topProducts,
    bestCustomer,
} from "./src/stats.js";

import fcfa from "./src/format.js";
// import { buildReport } from "./src/report.js";
import { writeFile } from "node:fs/promises";

async function main() {

    try{   
        const [carts, products, users] = await Promise.all([
            getCarts(),
            getProducts(),
            getUsers(),
        ]);

        const revenue = totalRevenue(carts.carts);
        const categories = revenueByCategory(carts.carts, products.products);
        const productsTop = topProducts(carts.carts, 5);
        const customer = bestCustomer(carts.carts, users.users);

        console.log("Chiffre d'affaires :", fcfa(revenue));

        console.table(
            categories.slice(0, 5)
        );

        // const report = buildReport({
        //     date: new Date(),
        //     cartCount: carts.carts.length,
        //     revenue,
        //     bestCustomer: customer,
        //     categories,
        //     topProducts: productsTop,
        // });

        // await writeFile("rapport.md", report, "utf8");

        // console.log("Rapport écrit dans rapport.md");

    } catch(error){
        if (error instanceof ApiError){
            console.error(`Bilan impossible : ${error.message}`)
        } else {
        console.error(error);
        }
        process.exitCode = 1;
    }
}

main();