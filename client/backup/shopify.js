.product {
    margin: 0;
  }
  
  .product.grid {
    gap: 0;
  }
  
  .product--no-media {
    max-width: 57rem;
    margin: 0 auto;
  }
  
  .product__media-wrapper {
    padding-left: 0;
  }
  
  .product__info-wrapper {
    padding-left: 0;
    padding-bottom: 0;
  }
  
  @media screen and (min-width: 750px) {
    .product--thumbnail .product__media-gallery,
    .product--thumbnail_slider .product__media-gallery,
    .product--stacked .product__info-container--sticky {
      display: block;
      position: sticky;
      top: 3rem;
      z-index: 2;
    }
  
    .product--thumbnail .thumbnail-list {
      padding-right: var(--media-shadow-horizontal-offset);
    }
  
    .product__info-wrapper {
      padding-left: 5rem;
    }
  
    .product__info-wrapper--extra-padding {
      padding-left: 8rem;
    }
  
    .product__media-container .slider-buttons {
      display: none;
    }
  }
  
  @media screen and (min-width: 990px) {
    .product--large:not(.product--no-media) .product__media-wrapper {
      max-width: 65%;
      width: calc(65% - var(--grid-desktop-horizontal-spacing) / 2);
    }
  
    .product--large:not(.product--no-media) .product__info-wrapper {
      padding-left: 4rem;
      max-width: 35%;
      width: calc(35% - var(--grid-desktop-horizontal-spacing) / 2);
    }
  
    .product--medium:not(.product--no-media) .product__media-wrapper,
    .product--small:not(.product--no-media) .product__info-wrapper {
      max-width: 55%;
      width: calc(55% - var(--grid-desktop-horizontal-spacing) / 2);
    }
  
    .product--medium:not(.product--no-media) .product__info-wrapper,
    .product--small:not(.product--no-media) .product__media-wrapper {
      max-width: 45%;
      width: calc(45% - var(--grid-desktop-horizontal-spacing) / 2);
    }
  }
  
  /* Dynamic checkout */
  
  .shopify-payment-button__button {
    font-family: inherit;
    min-height: 4.6rem;
  }
  
  .shopify-payment-button__button [role="button"].focused,
  .no-js .shopify-payment-button__button [role="button"]:focus {
    outline: .2rem solid rgba(var(--color-foreground),.5) !important;
    outline-offset: 0.3rem;
    box-shadow: 0 0 0 .1rem rgba(var(--color-button),var(--alpha-button-border)),0 0 0 .3rem rgb(var(--color-background)),0 0 .5rem .4rem rgba(var(--color-foreground),.3) !important;
  }
  
  .shopify-payment-button__button [role="button"]:focus:not(:focus-visible) {
    outline: 0;
    box-shadow: none !important;
  }
  
  .shopify-payment-button__button [role="button"]:focus-visible {
    outline: .2rem solid rgba(var(--color-foreground),.5) !important;
    box-shadow: 0 0 0 .1rem rgba(var(--color-button),var(--alpha-button-border)),0 0 0 .3rem rgb(var(--color-background)),0 0 .5rem .4rem rgba(var(--color-foreground),.3) !important;
  }
  
  .shopify-payment-button__button--unbranded {
    background-color: rgba(var(--color-button), var(--alpha-button-background));
    color: rgb(var(--color-button-text));
    font-size: 1.4rem;
    line-height: calc(1 + 0.2 / var(--font-body-scale));
    letter-spacing: 0.07rem;
  }
  
  .shopify-payment-button__button--unbranded::selection {
    background-color: rgba(var(--color-button-text), 0.3);
  }
  
  .shopify-payment-button__button--unbranded:hover,
  .shopify-payment-button__button--unbranded:hover:not([disabled]) {
    background-color: rgba(var(--color-button), var(--alpha-button-background));
  }
  
  .shopify-payment-button__more-options {
    margin: 1.6rem 0 1rem;
    font-size: 1.2rem;
    line-height: calc(1 + 0.5 / var(--font-body-scale));
    letter-spacing: 0.05rem;
    text-decoration: underline;
    text-underline-offset: 0.3rem;
  }
  
  .shopify-payment-button__button--hidden {
    display: none;
  }
  
  /* Product form */
  
  .product-form {
    display: block;
  }
  
  .product-form__error-message-wrapper:not([hidden]) {
    display: flex;
    align-items: flex-start;
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }
  
  .product-form__error-message-wrapper svg {
    flex-shrink: 0;
    width: 1.2rem;
    height: 1.2rem;
    margin-right: 0.7rem;
    margin-top: 0.5rem;
  }
  
  /* Form Elements */
  .product-form__input {
    flex: 0 0 100%;
    padding: 0;
    margin: 0 0 1.2rem 0;
    max-width: 37rem;
    min-width: fit-content;
    border: none;
  }
  
  variant-radios,
  variant-selects {
    display: block;
  }
  
  .product-form__input--dropdown {
    margin-bottom: 1.6rem;
  }
  
  .product-form__input .form__label {
    padding-left: 0;
  }
  
  fieldset.product-form__input .form__label {
    margin-bottom: 0.2rem;
  }
  
  .product-form__input input[type='radio'] {
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
    position: absolute;
    height: 1px;
    width: 1px;
  }
  
  .product-form__input input[type='radio'] + label {
    border: var(--variant-pills-border-width) solid rgba(var(--color-foreground), var(--variant-pills-border-opacity));
    background-color: rgb(var(--color-background));
    color: rgba(var(--color-foreground));
    border-radius: var(--variant-pills-radius);
    color: rgb(var(--color-foreground));
    display: inline-block;
    margin: 0.7rem 0.5rem 0.2rem 0;
    padding: 1rem 2rem;
    font-size: 1.4rem;
    letter-spacing: 0.1rem;
    line-height: 1;
    text-align: center;
    transition: border var(--duration-short) ease;
    cursor: pointer;
    position: relative;
  }
  
  .product-form__input input[type='radio'] + label:before {
    content: '';
    position: absolute;
    top: calc(var(--variant-pills-border-width) * -1);
    right: calc(var(--variant-pills-border-width) * -1);
    bottom: calc(var(--variant-pills-border-width) * -1);
    left: calc(var(--variant-pills-border-width) * -1);
    z-index: -1;
    border-radius: var(--variant-pills-radius);
    box-shadow: var(--variant-pills-shadow-horizontal-offset) var(--variant-pills-shadow-vertical-offset) var(--variant-pills-shadow-blur-radius) rgba(var(--color-shadow), var(--variant-pills-shadow-opacity));
  }
  
  .product-form__input input[type='radio'] + label:hover {
    border-color: rgb(var(--color-foreground));
  }
  
  .product-form__input input[type='radio']:checked + label {
    background-color: rgb(var(--color-foreground));
    color: rgb(var(--color-background));
  }
  
  @media screen and (forced-colors: active) {
    .product-form__input input[type=radio]:checked + label {
      text-decoration: underline;
    }
  }
  
  .product-form__input input[type='radio']:checked + label::selection {
    background-color: rgba(var(--color-background), 0.3);
  }
  
  .product-form__input input[type='radio']:disabled + label {
    border-color: rgba(var(--color-foreground), 0.1);
    color: rgba(var(--color-foreground), 0.4);
    text-decoration: line-through;
  }
  .product-form__input input[type='radio']:focus-visible + label {
    box-shadow: 0 0 0 0.3rem rgb(var(--color-background)),
      0 0 0 0.5rem rgba(var(--color-foreground), 0.55);
  }
  
  /* Fallback */
  .product-form__input input[type='radio'].focused + label,
  .no-js .shopify-payment-button__button [role="button"]:focus + label {
    box-shadow: 0 0 0 0.3rem rgb(var(--color-background)),
      0 0 0 0.5rem rgba(var(--color-foreground), 0.55);
  }
  
  /* No outline when focus-visible is available in the browser */
  .no-js .product-form__input input[type='radio']:focus:not(:focus-visible) + label {
    box-shadow: none;
  }
  
  .product-form__input .select {
    max-width: 25rem;
  }
  
  .product-form__submit {
    margin-bottom: 1rem;
  }
  
  .no-js .product-form__submit.button--secondary {
    --color-button: var(--color-base-accent-1);
    --color-button-text: var(--color-base-solid-button-labels);
    --alpha-button-background: 1;
  }
  
  .product-form__submit[aria-disabled="true"] + .shopify-payment-button,
  .product-form__submit[disabled] + .shopify-payment-button {
    display: none;
  }
  
  @media screen and (forced-colors: active) {
    .product-form__submit[aria-disabled="true"] {
      color: Window;
    }
  }
  
  /* Overrides */
  .shopify-payment-button__more-options {
    color: rgb(var(--color-foreground));
  }
  
  .shopify-payment-button__button {
    font-size: 1.5rem;
    letter-spacing: 0.1rem;
  }
  
  /* Product info */
  
  .product__info-container > * + * {
    margin: 1.5rem 0;
  }
  
  .product__info-container .product-form,
  .product__info-container .product__description {
    margin: 2.5rem 0;
  }
  
  .product__text {
    margin-bottom: 0;
  }
  
  a.product__text {
    display: block;
    text-decoration: none;
    color: rgba(var(--color-foreground), 0.75);
  }
  
  .product__text.caption-with-letter-spacing {
    text-transform: uppercase;
  }
  
  .product__title {
    word-break: break-word;
    margin-bottom: 1.5rem;
  }
  
  .product__title + .product__text.caption-with-letter-spacing {
    margin-top: -1.5rem;
  }
  
  .product__text.caption-with-letter-spacing + .product__title {
    margin-top: 0;
  }
  
  .product__accordion .accordion__content {
    padding: 0 1rem;
  }
  
  .product .price .badge {
    margin-bottom: 0.5rem;
  }
  
  .product .price__container {
    margin-bottom: 0.5rem;
  }
  
  .product .price dl {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .product .price--sold-out .price__badge-sold-out {
    background: transparent;
    color: rgb(var(--color-base-text));
    border-color: transparent;
  }
  
  .product .price--sold-out .price__badge-sale {
    display: none;
  }
  
  @media screen and (min-width: 750px) {
    .product__info-container {
      max-width: 60rem;
    }
    
    .product__info-container .price--on-sale .price-item--regular {
      font-size: 1.6rem;
    }
  
    .product__info-container > *:first-child {
      margin-top: 0;
    }
  }
  
  .product__description-title {
    font-weight: 600;
  }
  
  .product--no-media .product__title,
  .product--no-media .product__text,
  .product--no-media noscript .product-form__input,
  .product--no-media .product__tax  {
    text-align: center;
  }
  
  .product--no-media .product__media-wrapper {
    padding: 0;
  }
  
  .product__tax {
    margin-top: -1.4rem;
  }
  
  .product--no-media noscript .product-form__input,
  .product--no-media .share-button {
    max-width: 100%;
  }
  
  .product--no-media fieldset.product-form__input,
  .product--no-media .product-form__quantity,
  .product--no-media .product-form__input--dropdown,
  .product--no-media .share-button,
  .product--no-media .product__view-details,
  .product--no-media .product__pickup-availabilities,
  .product--no-media .product-form {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  
  .product--no-media .product-form {
    flex-direction: column;
  }
  
  .product--no-media .product-form > .form {
    max-width: 30rem;
    width: 100%;
  }
  
  .product--no-media .product-form__quantity,
  .product--no-media .product-form__input--dropdown {
    flex-direction: column;
    max-width: 100%;
  }
  
  .product-form__quantity .form__label {
    margin-bottom: 0.6rem;
  }
  
  .product-form__quantity-top .form__label {
    margin-bottom: 1.2rem;
  }
  
  
  .product--no-media fieldset.product-form__input {
    flex-wrap: wrap;
    margin: 0 auto 1.2rem auto;
  }
  
  /* .product-form__buttons {
    max-width: 44rem;
  } */
  
  .product-form__buttons {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    align-items: center;
  }
  
  .product-form__submit,
  .shopify-payment-button {
    width: calc(50% - 10px);
    min-width: 150px; /* Adjust as necessary */
  }
  
  
  .product--no-media .product__info-container > modal-opener {
    display: block;
    text-align: center;
  }
  
  .product--no-media .product-popup-modal__button {
    padding-right: 0;
  }
  
  .product--no-media .price {
    text-align: center;
  }
  
  .product--no-media .product__info-wrapper {
    padding-left: 0;
  }
  
  /* Product media */
  .product__media-list video {
    border-radius: calc(var(--media-radius) - var(--media-border-width));
  }
  
  @media screen and (max-width: 749px) {
    .product__media-list {
      margin-left: -2.5rem;
      padding-bottom: 2rem;
      margin-bottom: 3rem;
      width: calc(100% + 4rem);
    }
  
    .product__media-wrapper slider-component:not(.thumbnail-slider--no-slide) {
      margin-left: -1.5rem;
      margin-right: -1.5rem;
    }
  
    .slider.product__media-list::-webkit-scrollbar {
      height: 0.2rem;
      width: 0.2rem;
    }
  
    .product__media-list::-webkit-scrollbar-thumb {
      background-color: rgb(var(--color-foreground));
    }
  
    .product__media-list::-webkit-scrollbar-track {
      background-color: rgba(var(--color-foreground), 0.2);
    }
  
    .product__media-list .product__media-item {
      width: calc(100% - 3rem);
    }
  }
  
  @media screen and (min-width: 750px) {
    .product--thumbnail .product__media-list,
    .product--thumbnail_slider .product__media-list {
      padding-bottom: var(--media-shadow-vertical-offset);
    }
  
    .product__media-list {
      padding-right: var(--media-shadow-horizontal-offset);
    }
  
    .product__media-item:first-child {
      width: 100%;
    }
  
    .product--thumbnail .product__media-item:not(.is-active),
    .product--thumbnail_slider .product__media-item:not(.is-active) {
      display: none;
    }
  
    .product-media-modal__content > .product__media-item--variant.product__media-item--variant {
      display: none;
    }
  
    .product-media-modal__content > .product__media-item--variant:first-child {
      display: block;
    }
  }
  
  .product__media-item.product__media-item--variant {
    display: none;
  }
  
  .product__media-item--variant:first-child {
    display: block;
  }
  
  @media screen and (max-width: 749px) {
    .product__media-item--variant:first-child {
      padding-right: 1.5rem;
    }
  }
  
  @media screen and (min-width: 750px) and (max-width: 989px) {
    .product__media-list .product__media-item:first-child {
      padding-left: 0;
    }
  
    .product--thumbnail_slider .product__media-list {
      margin-left: 0;
    }
  
    .product__media-list .product__media-item {
      padding: 0 0 0.5rem;
      width: 100%;
    }
  }
  
  .product__media-icon .icon {
    width: 1.2rem;
    height: 1.4rem;
  }
  
  .product__media-icon,
  .thumbnail__badge {
    background-color: rgb(var(--color-background));
    border-radius: 50%;
    border: 0.1rem solid rgba(var(--color-foreground), 0.1);
    color: rgb(var(--color-foreground));
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3rem;
    width: 3rem;
    position: absolute;
    left: calc( 0.4rem + var(--media-border-width));
    top: calc(0.4rem + var(--media-border-width));
    z-index: 1;
    transition: color var(--duration-short) ease,
      opacity var(--duration-short) ease;
  }
  
  .product__media-video .product__media-icon {
    opacity: 1;
  }
  
  .product__modal-opener--image .product__media-toggle:hover {
    cursor: zoom-in;
  }
  
  .product__modal-opener:hover .product__media-icon {
    border: 0.1rem solid rgba(var(--color-foreground), 0.1);
  }
  
  @media screen and (min-width: 750px) {
    .grid__item.product__media-item--full {
      width: 100%;
    }
  }
  
  @media screen and (min-width: 990px) {
    .product__modal-opener .product__media-icon {
      opacity: 0;
    }
  
    .product__modal-opener:hover .product__media-icon,
    .product__modal-opener:focus .product__media-icon {
      opacity: 1;
    }
  }
  
  .product__media-item > * {
    display: block;
    position: relative;
  }
  
  .product__media-toggle {
    display: flex;
    border: none;
    background-color: transparent;
    color: currentColor;
    padding: 0;
  }
  
  .product__media-toggle::after {
    content: '';
    cursor: pointer;
    display: block;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    height: 100%;
    width: 100%;
  }
  
  .product__media-toggle:focus-visible {
    outline: 0;
    box-shadow: none;
  }
  
  .product__media-toggle.focused {
    outline: 0;
    box-shadow: none;
  }
  
  .product__media-toggle:focus-visible:after {
    box-shadow: 0 0 0 0.3rem rgb(var(--color-background)),0 0 0rem 0.5rem rgba(var(--color-foreground), 0.5);
    border-radius: var(--media-radius) - var(--media-border-width);
  }
  
  .product__media-toggle.focused:after {
    box-shadow: 0 0 0 0.3rem rgb(var(--color-background)),0 0 0rem 0.5rem rgba(var(--color-foreground), 0.5);
    border-radius: var(--media-radius);
  }
  
  .product__media-toggle:focus-visible:after {
    border-radius: var(--media-radius);
  }
  
  .product-media-modal {
    background-color: rgb(var(--color-background));
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    visibility: hidden;
    opacity: 0;
    z-index: -1;
  }
  
  .product-media-modal[open] {
    visibility: visible;
    opacity: 1;
    z-index: 101;
  }
  
  .product-media-modal__dialog {
    display: flex;
    align-items: center;
    height: 100vh;
  }
  
  .product-media-modal__content {
    max-height: 100vh;
    width: 100%;
    overflow: auto;
  }
  
  .product-media-modal__content > *:not(.active),
  .product__media-list .deferred-media {
    display: none;
  }
  
  @media screen and (min-width: 750px) {
    .product-media-modal__content {
      padding-bottom: 2rem;
    }
  
    .product-media-modal__content > *:not(.active) {
      display: block;
    }
  
    .product__modal-opener:not(.product__modal-opener--image) {
      display: none;
    }
  
    .product__media-list .deferred-media {
      display: block;
    }
  }
  
  @media screen and (max-width: 749px) {
    .product--thumbnail .is-active > .product__modal-opener:not(.product__modal-opener--image),
    .product--thumbnail_slider .is-active > .product__modal-opener:not(.product__modal-opener--image) {
      display: none;
    }
  
    .product--thumbnail .is-active .deferred-media,
    .product--thumbnail_slider .is-active .deferred-media {
      display: block;
      width: 100%;
    }
  }
  
  .product-media-modal__content > * {
    display: block;
    height: auto;
    margin: auto;
  }
  
  .product-media-modal__content .media {
    background: none;
  }
  
  .product-media-modal__model {
    width: 100%;
  }
  
  .product-media-modal__toggle {
    background-color: rgb(var(--color-background));
    border: 0.1rem solid rgba(var(--color-foreground), 0.1);
    border-radius: 50%;
    color: rgba(var(--color-foreground), 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    right: 2rem;
    padding: 1.2rem;
    position: fixed;
    z-index: 2;
    top: 2rem;
    width: 4rem;
  }
  
  .product-media-modal__content .deferred-media {
    width: 100%;
  }
  
  @media screen and (min-width: 750px) {
    .product-media-modal__content {
      padding: 2rem 11rem;
    }
  
    .product-media-modal__content > * {
      width: 100%;
    }
  
    .product-media-modal__content > * + * {
      margin-top: 2rem;
    }
  
    .product-media-modal__toggle {
      right: 5rem;
      top: 2.2rem;
    }
  }
  
  @media screen and (min-width: 990px) {
    .product-media-modal__content {
      padding: 2rem 11rem;
    }
  
    .product-media-modal__content > * + * {
      margin-top: 1.5rem;
    }
  
    .product-media-modal__content {
      padding-bottom: 1.5rem;
    }
  
    .product-media-modal__toggle {
      right: 5rem;
    }
  }
  
  .product-media-modal__toggle:hover {
    color: rgba(var(--color-foreground), 0.75);
  }
  
  .product-media-modal__toggle .icon {
    height: auto;
    margin: 0;
    width: 2.2rem;
  }
  
  /* Product popup */
  
  .product-popup-modal {
    box-sizing: border-box;
    opacity: 0;
    position: fixed;
    visibility: hidden;
    z-index: -1;
    margin: 0 auto;
    top: 0;
    left: 0;
    overflow: auto;
    width: 100%;
    background: rgba(var(--color-foreground), 0.2);
    height: 100%;
  }
  
  .product-popup-modal[open] {
    opacity: 1;
    visibility: visible;
    z-index: 101;
  }
  
  .product-popup-modal__content {
    border-radius: var(--popup-corner-radius);
    background-color: rgb(var(--color-background));
    overflow: auto;
    height: 80%;
    margin: 0 auto;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 5rem;
    width: 92%;
    position: absolute;
    top: 0;
    padding: 0 1.5rem 0 3rem;
    border-color: rgba(var(--color-foreground), var(--popup-border-opacity));
    border-style: solid;
    border-width: var(--popup-border-width);
    box-shadow: var(--popup-shadow-horizontal-offset) var(--popup-shadow-vertical-offset) var(--popup-shadow-blur-radius) rgba(var(--color-shadow), var(--popup-shadow-opacity));
  }
  
  .product-popup-modal__content.focused {
    box-shadow: 0 0 0 0.3rem rgb(var(--color-background)),
    0 0 0.5rem 0.4rem rgba(var(--color-foreground), 0.3),
    var(--popup-shadow-horizontal-offset) var(--popup-shadow-vertical-offset) var(--popup-shadow-blur-radius) rgba(var(--color-shadow), var(--popup-shadow-opacity));
  }
  
  .product-popup-modal__content:focus-visible{
    box-shadow: 0 0 0 0.3rem rgb(var(--color-background)),
    0 0 0.5rem 0.4rem rgba(var(--color-foreground), 0.3),
    var(--popup-shadow-horizontal-offset) var(--popup-shadow-vertical-offset) var(--popup-shadow-blur-radius) rgba(var(--color-shadow), var(--popup-shadow-opacity));
  }
  
  @media screen and (min-width: 750px) {
    .product-popup-modal__content {
      padding-right: 1.5rem;
      margin-top: 10rem;
      width: 70%;
      padding: 0 3rem;
    }
  
    .product-media-modal__dialog .global-media-settings--no-shadow {
      overflow: visible !important;
    }
  }
  
  .product-popup-modal__content img {
    max-width: 100%;
  }
  
  @media screen and (max-width: 749px) {
    .product-popup-modal__content table {
      display: block;
      max-width: fit-content;
      overflow-x: auto;
      white-space: nowrap;
      margin: 0;
    }
  
    .product-media-modal__dialog .global-media-settings,
    .product-media-modal__dialog .global-media-settings video,
    .product-media-modal__dialog .global-media-settings model-viewer,
    .product-media-modal__dialog .global-media-settings iframe,
    .product-media-modal__dialog .global-media-settings img {
      border: none;
      border-radius: 0;
    }
  }
  
  .product-popup-modal__opener {
    display: inline-block;
  }
  
  .product-popup-modal__button {
    font-size: 1.6rem;
    padding-right: 1.3rem;
    padding-left: 0;
    height: 4.4rem;
    text-underline-offset: 0.3rem;
    text-decoration-thickness: 0.1rem;
    transition: text-decoration-thickness var(--duration-short) ease;
  }
  
  .product-popup-modal__button:hover {
    text-decoration-thickness: 0.2rem;
  }
  
  .product-popup-modal__content-info {
    padding-right: 4.4rem;
  }
  
  .product-popup-modal__content-info > * {
    height: auto;
    margin: 0 auto;
    max-width: 100%;
    width: 100%;
  }
  
  @media screen and (max-width: 749px) {
    .product-popup-modal__content-info > * {
      max-height: 100%;
    }
  }
  
  .product-popup-modal__toggle {
    background-color: rgb(var(--color-background));
    border: 0.1rem solid rgba(var(--color-foreground), 0.1);
    border-radius: 50%;
    color: rgba(var(--color-foreground), 0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: sticky;
    padding: 1.2rem;
    z-index: 2;
    top: 1.5rem;
    width: 4rem;
    margin: 0 0 0 auto;
  }
  
  .product-popup-modal__toggle:hover {
    color: rgba(var(--color-foreground), 0.75);
  }
  
  .product-popup-modal__toggle .icon {
    height: auto;
    margin: 0;
    width: 2.2rem;
  }
  
  .product__media-list .media > * {
    overflow: hidden;
  }
  
  .thumbnail-list {
    flex-wrap: wrap;
    grid-gap: 1rem;
  }
  
  @media screen and (min-width: 750px) {
    .product--stacked .thumbnail-list {
      display: none;
    }
  
    .thumbnail-list {
      display: grid;
      margin-left: -1rem;
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  .thumbnail-list_item--variant:not(:first-child) {
    display: none;
  }
  
  @media screen and (min-width: 990px) {
    .thumbnail-list {
      margin-left: 0;
      grid-template-columns: repeat(4, 1fr);
    }
  
    .product--medium .thumbnail-list {
      grid-template-columns: repeat(5, 1fr);
    }
  
    .product--large .thumbnail-list {
      grid-template-columns: repeat(6, 1fr);
    }
  }
  
  @media screen and (max-width: 749px) {
    .product__media-item {
      display: flex;
      align-items: center;
    }
  
    .product__modal-opener {
      width: 100%;
    }
  
    .thumbnail-slider {
      display: flex;
      align-items: center;
    }
  
    .thumbnail-slider .thumbnail-list.slider {
      display: flex;
      padding: 0.5rem;
      flex: 1;
      scroll-padding-left: 0.5rem;
    }
  
    .thumbnail-list__item.slider__slide {
      width: calc(33% - 0.6rem);
    }
  }
  
  @media screen and (min-width: 750px) {
    .product--thumbnail_slider .thumbnail-slider {
      display: flex;
      align-items: center;
    }
  
    .thumbnail-slider .thumbnail-list.slider--tablet-up {
      display: flex;
      padding: 0.5rem;
      flex: 1;
      scroll-padding-left: 0.5rem;
    }
  
    .product__media-gallery .slider-mobile-gutter .slider-button {
      display: none;
    }
  
    .thumbnail-list.slider--tablet-up .thumbnail-list__item.slider__slide {
      width: calc(25% - 0.8rem);
    }
  
    .product--thumbnail_slider .slider-mobile-gutter .slider-button {
      display: block;
    }
  }
  
  @media screen and (min-width: 900px) {
    .product--small .thumbnail-list.slider--tablet-up .thumbnail-list__item.slider__slide {
      width: calc(25% - 0.8rem);
    }
  
    .thumbnail-list.slider--tablet-up .thumbnail-list__item.slider__slide {
      width: calc(20% - 0.8rem);
    }
  }
  
  .thumbnail {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    height: 100%;
    width: 100%;
    padding: 0;
    color: rgb(var(--color-base-text));
    cursor: pointer;
    background-color: transparent;
  }
  
  .thumbnail:hover {
    opacity: 0.7;
  }
  
  .thumbnail.global-media-settings img {
    border-radius: 0;
  }
  
  .thumbnail[aria-current] {
    box-shadow: 0 0 0rem 0.1rem rgb(var(--color-foreground));
    border-color: rgb(var(--color-foreground));
  }
  
  .thumbnail[aria-current]:focus-visible {
    box-shadow: 0 0 0 0.3rem rgb(var(--color-background)),0 0 0rem 0.5rem rgba(var(--color-foreground), 0.5);
  }
  
  .thumbnail[aria-current]:focus,
  .thumbnail.focused {
    outline: 0;
    box-shadow: 0 0 0 0.3rem rgb(var(--color-background)),0 0 0rem 0.5rem rgba(var(--color-foreground), 0.5);
  }
  
  .thumbnail[aria-current]:focus:not(:focus-visible) {
    outline: 0;
    box-shadow: 0 0 0 0.1rem rgb(var(--color-foreground));
  }
  
  .thumbnail img {
    pointer-events: none;
  }
  
  .thumbnail--narrow img {
    height: 100%;
    width: auto;
    max-width: 100%;
  }
  
  .thumbnail--wide img {
    height: auto;
    width: 100%;
  }
  
  .thumbnail__badge .icon {
    width: 1rem;
    height: 1rem;
  }
  
  .thumbnail__badge .icon-3d-model {
    width: 1.2rem;
    height: 1.2rem;
  }
  
  .thumbnail__badge {
    color: rgb(var(--color-foreground), 0.6);
    height: 2rem;
    width: 2rem;
    left: auto;
    right: calc(0.4rem + var(--media-border-width));
    top: calc(0.4rem + var(--media-border-width));
  }
  
  @media screen and (min-width: 750px) {
    .product:not(.product--small) .thumbnail__badge {
      height: 3rem;
      width: 3rem;
    }
  
    .product:not(.product--small) .thumbnail__badge .icon {
      width: 1.2rem;
      height: 1.2rem;
    }
  
    .product:not(.product--small) .thumbnail__badge .icon-3d-model {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
  
  .thumbnail-list__item {
    position: relative;
  }
  
  .thumbnail-list__item::before {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  
  
  
  