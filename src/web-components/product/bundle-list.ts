import { html, css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { runWhenAvailable } from '../../utils'
import { API_ENDPOINT } from '../../config'

@customElement('bundle-list')
export class BundleList extends LitElement {
  @property({ type: Boolean })
  private shouldDisplay = false

  @property({ type: String, attribute: 'webflow-product-hero-id' })
  wflowBlockId: string

  static styles = css`
    section {
      background-color: #353535;
    }
  `

  connectedCallback() {
    super.connectedCallback()

    runWhenAvailable({
      getMethod: () => window.posthog?.onFeatureFlags,
      callback: () => {
        window.posthog?.onFeatureFlags(async () => {
          this.shouldDisplay =
            window.posthog?.isFeatureEnabled('internal-features') ?? false

          if (this.shouldDisplay) {
            document.getElementById(this.wflowBlockId)?.remove()
            console.debug('API_ENDPOINT', API_ENDPOINT)

            const response = await fetch(`${API_ENDPOINT}/bundle`)
            const data = await response.json()
            console.debug('data', data)
          }
        })
      },
    })
  }

  render() {
    return this.shouldDisplay
      ? html`<section>
          <h2>Bundle List</h2>
        </section>`
      : ``
  }
}
