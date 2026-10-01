import { test as base } from "@playwright/test";
import { TodoPage } from "../todo-page";


type TodoFixtures = {
    todoPageWithItems: TodoPage;

}

export const test = base.extend<TodoFixtures>({
    todoPageWithItems: async ({ page }, use) =>{
        const todoPage = new TodoPage(page);
        await todoPage.addTodo("learn English");
        await todoPage.addTodo("reading book");
        await todoPage.addTodo("eating food");

        await use(todoPage);

    }
})