import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<title>iDoctor</title>
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
					<link rel="theme-color" href="#0000" />
					<link rel='icon' href="/img/logo.png"/>
				</Head>
				<body className="">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;