import dateFormat from 'dateformat'
import { History } from 'history'
import update from 'immutability-helper'
import * as React from 'react'
import {
  Button,
  Checkbox,
  Divider,
  Grid,
  Header,
  Icon,
  Input,
  Image,
  Loader,
  Form
} from 'semantic-ui-react'

import { createQuote, deleteQuote, getQuotes, patchQuote } from '../api/quotes-api'
import Auth from '../auth/Auth'
import { Quote } from '../types/Quote'

interface QuotesProps {
  auth: Auth
  history: History
}

interface QuotesState {
  quotes: Quote[]
  newQuoteBody: string
  newQuoteAuthor: string
  loadingQuotes: boolean
}

export class Quotes extends React.PureComponent<QuotesProps, QuotesState> {
  state: QuotesState = {
    quotes: [],
    newQuoteBody: '',
    newQuoteAuthor: '',
    loadingQuotes: true
  }

  handleQuoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newQuoteBody: event.target.value })
  }

  handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newQuoteAuthor: event.target.value })
  }

  onEditButtonClick = (quoteId: string) => {
    this.props.history.push(`/quotes/${quoteId}/edit`)
  }

  onQuoteCreate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const userId = JSON.stringify(this.props.auth.getIdToken()).substr(153, 10)
      console.log(userId)
      const newQuote = await createQuote(this.props.auth.getIdToken(), {
        quoteBody: this.state.newQuoteBody,
        author: this.state.newQuoteAuthor,
        userId 
      })
      this.setState({
        quotes: [...this.state.quotes, newQuote],
        newQuoteBody: '',
        newQuoteAuthor: ''
      })
    } catch {
      alert('Quote creation failed')
    }
  }

  onQuoteDelete = async (quoteId: string) => {
    try {
      await deleteQuote(this.props.auth.getIdToken(), quoteId)
      this.setState({
        quotes: this.state.quotes.filter(quote => quote.quoteId != quoteId)
      })
    } catch {
      alert('Quote deletion failed')
    }
  }

  onQuoteCheck = async (pos: number) => {
    try {
      const quote = this.state.quotes[pos]
      await patchQuote(this.props.auth.getIdToken(), quote.quoteId, {
        quoteBody: quote.quoteBody,
        author: quote.author,
        like: !quote.like,
        attachmentUrl: quote.attachmentUrl
      })
      this.setState({
        quotes: update(this.state.quotes, {
          [pos]: { like: { $set: !quote.like } }
        })
      })
    } catch {
      alert('Quote deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const quotes = await getQuotes(this.props.auth.getIdToken())
      this.setState({
        quotes,
        loadingQuotes: false
      })
    } catch (e) {
      alert(`Failed to fetch quotes: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <Header as="h1">Quotes</Header>

        {this.renderCreateQuoteInput()}

        {this.renderQuotes()}
      </div>
    )
  }

  renderCreateQuoteInput() {
    return (
      <Grid.Row>
        <Grid.Column width={16}>
          <Form>
            <Form.Field>
              <label>Quote</label>
              <Input placeholder="Be the change you see in the world" 
                onChange={this.handleQuoteChange}
                fluid />
            </Form.Field>
            <Form.Field>
              <label>Author</label>
              <Input placeholder="Thomas Edison" 
                onChange={this.handleAuthorChange}
                fluid />
            </Form.Field>
            {
              this.state.newQuoteAuthor != '' && 
              this.state.newQuoteBody != ''
              ? 
              <Button 
              onClick={this.onQuoteCreate}
              size="medium"
              color="violet">
                Submit
              </Button>
              : 
              <Button
              disabled
              size="medium">
                Submit
              </Button>
            }
          </Form>
        </Grid.Column>
        <Grid.Column width={16}>
          <Divider />
        </Grid.Column>
      </Grid.Row>
    )
  }

  renderQuotes() {
    if (this.state.loadingQuotes) {
      return this.renderLoading()
    }

    return this.renderQuotesList()
  }

  renderLoading() {
    return (
      <Grid.Row>
        <Loader indeterminate active inline="centered">
          Loading Quotes
        </Loader>
      </Grid.Row>
    )
  }

  renderQuotesList() {
    return (
      <Grid className="gridTest" padded>
        {this.state.quotes.map((quote, pos) => {
          return (
            <Grid.Row key={quote.quoteId}>
              <Grid.Column width={1} verticalAlign="middle">
                {
                quote.like ? 
                <Icon name="heart" color="pink" size="big"                
                  onClick={() => this.onQuoteCheck(pos)}/> : 
                <Icon name="heart outline" color="pink" size="big"   
                  onClick={() => this.onQuoteCheck(pos)}/>
                  }
              </Grid.Column>
              <Grid.Column width={10} verticalAlign="middle">
                {quote.quoteBody}
              </Grid.Column>
              <Grid.Column width={3} floated="right">
                {quote.author}
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  color="blue"
                  onClick={() => this.onEditButtonClick(quote.quoteId)}
                >
                  <Icon name="pencil" />
                </Button>
              </Grid.Column>
              <Grid.Column width={1} floated="right">
                <Button
                  icon
                  className="deleteTest"
                  color="red"
                  onClick={() => this.onQuoteDelete(quote.quoteId)}
                >
                  <Icon name="delete" />
                </Button>
              </Grid.Column>
              {quote.attachmentUrl && (
                <Image src={quote.attachmentUrl} size="small" wrapped />
              )}
              <Grid.Column width={16}>
                <Divider />
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    )
  }

  calculateDueDate(): string {
    const date = new Date()
    date.setDate(date.getDate() + 7)

    return dateFormat(date, 'yyyy-mm-dd') as string
  }
}
