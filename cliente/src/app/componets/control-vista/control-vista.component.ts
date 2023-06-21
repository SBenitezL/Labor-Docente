export class ControlVistaComponent {
  constructor(private id:number)
  {
  }
  public setCurrent(id:number)
  {
    this.id = id;
  }
  public getCurrent()
  {
    return this.id;
  }
}

export  const currentUser = new ControlVistaComponent(0);