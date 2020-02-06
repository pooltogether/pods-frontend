// TODO: Remove this!

import { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { TightbeamContext } from 'lib/components/TightbeamContext'

const debug = require('debug')('pt:events:EventSubscription')

export const EventSubscription =
  class _EventSubscription extends PureComponent {
    static propTypes = {
      name: PropTypes.string,
      abi: PropTypes.string,
      address: PropTypes.string,
      event: PropTypes.string,
      params: PropTypes.array,
      fromBlock: PropTypes.any,
      toBlock: PropTypes.any,
      topics: PropTypes.array,
      extraTopics: PropTypes.array,
      onEvent: PropTypes.func
    }

    static defaultProps = {
      event: 'allEvents'
    }

    static contextType = TightbeamContext

    state = {}

    componentDidMount() {
      this.subscribe()
    }

    componentWillUnmount() {
      this.tryUnsubscribe()
    }

    async subscribe() {
      const subscriber = await this.context.subscribeEvent(this.props)

      this.subscription = subscriber.subscribe({
        next: (data) => {
          debug("got next data: ", data)

          if (this.props.onEvent) {
            this.props.onEvent(data)
          }

          this.setState({ data })
        }
      })
    }

    tryUnsubscribe() {
      if (this.subscription) {
        this.subscription.unsubscribe()
        this.subscription = null
      }
    }

    render() {
      let data

      if (this.lastData != this.state.data) {
        this.lastData = this.state.data
        data = this.state.data
      }

      if (typeof this.props.children === 'function') {
        return this.props.children({ data })
      } else {
        return this.props.children || null
      }
    }
  }