import { SampleComponent } from "../../../src/feature/components/SampleComponent";
import { PageLayoutMock } from "../../mocks/PageLayoutMock";
import { ComponentFactory, IComponentDeclaration } from "../../../src/foundation/services/ComponentFactory";

describe("SampleComponent", () => {
    function makePage(): PageLayoutMock {
        return new PageLayoutMock("/scripts/json/sitecore.json");
    }

    describe("constructor tests", () => {
        it("can create new SampleComponent instance", () => {
            // Arrange
            const page = makePage();
            const html = `
<div>
  <div id='myDiv' data-component='SampleComponent'>
    <a class='btn-primary'></a>
    <div class='card-deck'></div>
  </div>
</div>`;
            document.body.innerHTML = html;
            const div = document.getElementById("myDiv");

            // Act
            page.afterPageLoad();
            const result = ComponentFactory.loadedComponents
                .find((decl: IComponentDeclaration) => decl.element === div);

            // Assert
            expect(result).not.toBeUndefined();
            expect(result.component instanceof SampleComponent).toBe(true);
        });

        it("SampleComponent throws error when require child elements are missing", () => {
            // Arrange
            const page = makePage();
            const html = `<div><div id='myDiv' data-component='SampleComponent'></div></div>`;
            document.body.innerHTML = html;

            // Act
            // Assert
            expect(() => page.afterPageLoad()).toThrowError();
        });
    });
});
