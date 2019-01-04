import App, { Container } from 'next/app';
import Page from '../components/Page';
import { ApolloProvider } from 'react-apollo';
import withData from '../lib/withData';

class MyApp extends App {
  // NOTE: getInitialProps runs before render() (next lifecycle)
  static async getInitialProps({ Component, context }) {
    // this method crawls all our pages, checks if there are any queries
    // and fetches data before the render actually happens
    // this is because next is a server-rendered app
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context);
    }
    // this exposes the query to the user
    pageProps.query = context.query;
    return { pageProps };
  }
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

// exporting with the "withData" makes the apollo client
// accesible
export default withData(MyApp);
