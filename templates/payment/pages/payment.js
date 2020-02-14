module.exports = async function($) {
  $.page.title = 'Activate site'

  async function handleActivate() {
    text('.errors', ' ')
    const result = await stripe.createToken(card)
    if (!result.error) {
      const amount = serialize(q('form')).amount
      const payment = await api.fetch({
        path: 'createPayment',
        data: {
          token: result.token.id,
          site_id: site._id,
          amount
        }
      })
      if (payment.error) {
        flash(payment.error.message)
      } else {
        cookie('flash', 'Your site has been activated!')
        location = '/sites.html'
      }
    }
  }

  async function initPayment() {
    const _id = location.search.split('=')[1]
    site = await api.fetch({ path: 'getSite', data: { _id } })
    const style = {
      base: {
        fontFamily: 'Lucida Grande, Lucida Sans Unicode, Lucida Sans, Geneva, Verdana, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '18px',
        '::placeholder': {}
      },
      invalid: {
        color: 'red',
        iconColor: 'red'
      }
    }
    stripe = Stripe('pk_test_2rFGvBB0RodAQ1Bf4nGaK1df')
    const elements = stripe.elements()
    card = elements.create('card', { style })
    card.mount('#card-element')
    card.addEventListener('change', function(event) {
      text('.errors', event.error ? event.error.message : '')
    })
  }

  return /* html */`
    <style>
      .card-form {
        margin: 1rem 0 1.5rem;
      }
      #card-element {
        max-width: 500px;
      }
      .wait {
        color: #999;
      }
    </style>

    <h1>Activate site</h1>
    <div class="payment-form">
      <form onsubmit="return false">
        <div>
          <label>
            <input type="radio" name="amount" value="799" checked>
            12 months for $799
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="amount" value="499">
            6 months for $499
          </label>
        </div>
        <div>
          <label>
            <input type="radio" name="amount" value="299">
            3 months for $299
          </label>
        </div>
      </form>
      <div class="card-form">
        <div id="card-element"></div>
        <div class="errors"></div>
      </div>
      <p>
        <button onclick="spinner(this, handleActivate)">Activate</button>
      </p>
      <p>
        <a href="/sites.html">Back to site list</a>
      </p>
    </div>
    <script src="https://js.stripe.com/v3"></script>
    <script>
      ${initPayment};${handleActivate}
      var stripe, card, site
      initPayment()
    </script>
  `
}
