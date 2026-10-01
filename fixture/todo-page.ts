import { Locator, Page } from "@playwright/test";

export class TodoPage {
  page: Page;
  newTodo: Locator;
  todoTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newTodo = page.getByPlaceholder("What needs to be done?");
    this.todoTitle = page.getByTestId("todo-title");
  }

  async goto() {
    await this.page.goto("https://demo.playwright.dev/todomvc");
  }

  async addTodo(title: string) {
    await this.newTodo.fill(title);
    await this.newTodo.press("Enter");
  }

  async deleteTodo(title: string) {
    const todo = this.page.getByTestId("todo-item").filter({
      hasText: new RegExp(`^${title}$`),
    });

    await todo.hover();
    const deleteTodo = this.page.getByRole("button");
    await deleteTodo.click();
  }

  async completeTodo(title: string) {
    const completeTodo = this.page
      .getByTestId("todo-item")
      .filter({ hasText: new RegExp(`^${title}$`) });

    await completeTodo.getByRole("checkbox").check();
  }

  async showActive() {
  await this.page
    .getByRole("link", { name: "Active", exact: true })
    .click();
}
}
