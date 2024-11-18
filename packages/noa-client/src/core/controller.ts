import { CommandManager } from './command/command-manager'
import { Page, PageFactory, PageType } from './pages'

export class EditorController {
  page: Page

  commandManager: CommandManager

  constructor(public pageId: string, public type: PageType, name: string) {
    const PageConstructor = PageFactory.getConstructor(type)
    this.page = new PageConstructor(pageId, name)
    this.commandManager = new CommandManager(this.page)
  }
}
