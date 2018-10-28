import { ComponentBase } from "../ComponentBase";
import { ComponentFactory } from "../../foundation/services/ComponentFactory";
import { IContext } from "../../foundation/interfaces/IContext";
import { ICard } from "../interfaces/ICard";

export class SampleComponent extends ComponentBase {
    private readonly cta: HTMLElement;
    private readonly cardDeck: HTMLElement;

    // The value of element is the HTML element with the data-component property
    constructor(public element: HTMLElement, public context: IContext) {
        super(context);

        this.cardDeck = this.element.querySelector(".card-deck");
        this.cta = this.element.querySelector(".btn-primary");
        this.cta.addEventListener("click", (ev: Event) => {
            ev.preventDefault();
            this.callToAction();
        });
    }

    public callToAction() {
        this.context.sitecoreService.getSitecoreData("Card", "GetCards")
            .then((cards: ICard[]) => this.showCards(cards));
    }

    public showCards(cards: ICard[]) {
        cards.forEach((card) => this.appendCard(card));
    }

    public appendCard(card: ICard) {
        const html = `<div class="card text-white ${card.priority} mb-3" style="max-width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${card.title}</h5>
          <p class="card-text">${card.description}</p>
        </div></div>`;
        this.cardDeck.insertAdjacentHTML("beforeend", html);
    }
}

// Registers component with ComponentFactory so that it can be initialized
ComponentFactory.registerComponent("SampleComponent", SampleComponent);
