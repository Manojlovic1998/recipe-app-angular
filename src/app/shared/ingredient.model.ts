export class Ingredient {
  public text: string;
  public quantity: number;
  public measure: string;
  public food: string;
  public weight: number;
  public foodCategory: string;
  public foodId: string;
  public image: string;

  constructor(text: string, quantity: number) {
    this.text = text;
    this.quantity = quantity;
  }
}
