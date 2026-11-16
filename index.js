import { getCarts, getProducts, getUsers } from "./src/api";
async function main() {
    const [carts, products, users] = await Promise.all([
        getCarts(),
        getProducts(),
        getUsers(),
    ]);
}
main().catch((error) => {
    ProcessingInstruction.exitCode = 1;
});