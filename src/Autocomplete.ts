export class autocomplete {
  private currentFocus: number = 0;
  constructor(
    private InpElement?: HTMLInputElement,
    private countries?: string[]
  ) {}

  removeActive(x: any) {
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  addActive(x: any) {
    if (!x) return false;
    this.removeActive(x);
    if (this.currentFocus >= x.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = x.length - 1;
    x[this.currentFocus].classList.add("autocomplete-active");
  }

  closeAllLists(elmnt?: any) {
    var x = document.getElementsByClassName("autocomplete-items");
    Array.from(x).forEach((y) => {
      if (elmnt != y && elmnt != this.InpElement) {
        y.parentNode?.removeChild(y);
      }
    });
  }

  clickHandler1 = (e: any) => {
    this.closeAllLists(e.target);
  };

  clickHandler2 = (e: any) => {
    var x: HTMLInputElement = <HTMLInputElement>e.target;
    this.InpElement!.value = this.InpElement!.value = x.getElementsByTagName(
      "input"
    )[0].value;
    this.closeAllLists();
  };

  inputHandler = () => {
    var val = this.InpElement?.value;
    var a: HTMLDivElement;
    var b: HTMLDivElement;
    this.closeAllLists();

    if (!this.InpElement?.value) {
      return false;
    }

    this.currentFocus = -1;
    a = <HTMLDivElement>document.createElement("DIV");

    a.setAttribute("id", this.InpElement.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.InpElement.parentNode!.appendChild(a);

    this.countries?.forEach((y) => {
      if (y.substr(0, val!.length).toUpperCase() == val!.toUpperCase()) {
        b = <HTMLDivElement>document.createElement("DIV");
        b.innerHTML = "<strong>" + y.substr(0, val!.length) + "</strong>";
        b.innerHTML += y.substr(val!.length);
        b.innerHTML += "<input type='hidden' value='" + y + "'>";

        b.addEventListener("click", this.clickHandler2);
        a.appendChild(b);
      }
    });
  };

  keydownHandler = (e: KeyboardEvent) => {
    var x: any = document.getElementById(
      this.InpElement?.id + "autocomplete-list"
    );
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      this.currentFocus++;
      this.addActive(x);
    } else if (e.keyCode == 38) {
      this.currentFocus--;
      this.addActive(x);
    } else if (e.keyCode == 13) {
      e.preventDefault();
      if (this.currentFocus > -1) {
        if (x) {
          var y: HTMLInputElement = <HTMLInputElement>x[this.currentFocus];
          y.click();
        }
      }
    }
  };

  autocomplete = () => {
    document.addEventListener("click", this.clickHandler1);
    this.InpElement?.addEventListener("input", this.inputHandler);
    this.InpElement?.addEventListener("keydown", this.keydownHandler);
  };
}
