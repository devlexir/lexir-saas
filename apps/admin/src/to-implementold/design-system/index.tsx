import Alert from '@components/ui/alert'
import Button from '@components/ui/button'
import Head from 'next/head'

export default function Home() {
    return (
        <div className="flex h-screen">
            <Head>
                <title>Platforms on Vercel</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="container mx-auto w-full flex flex-col">
                <div className="flex flex-wrap mt-4">
                    <Button
                        variant="normal"
                        size="small"
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                    <Button
                        variant="normal"
                        size="small"
                        loading
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                    <Button
                        variant="normal"
                        size="small"
                        disabled
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                    <Button
                        variant="outline"
                        size="small"
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                    <Button
                        variant="outline"
                        size="small"
                        loading
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                    <Button
                        variant="outline"
                        size="small"
                        disabled
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                    <Button
                        variant="custom"
                        size="small"
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                </div>
                <div className="flex flex-wrap mt-4">
                    <Button
                        variant="normal"
                        size="medium"
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                    <Button
                        variant="outline"
                        size="medium"
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                    <Button
                        variant="custom"
                        size="medium"
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                </div>
                <div className="flex flex-wrap mt-4">
                    <Button
                        variant="normal"
                        size="big"
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                    <Button
                        variant="outline"
                        size="big"
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                    <Button
                        variant="custom"
                        size="big"
                        className="me-4"
                        type="button"
                    >
                        Teste
                    </Button>
                </div>
            </div>
            <div className="container mx-auto w-full flex flex-col">
                <Alert variant="info" message="Some message" />
                <Alert variant="warning" message="Some message" />
                <Alert variant="error" message="Some message" />
                <Alert variant="success" message="Some message" />
                <Alert variant="infoOutline" message="Some message" />
                <Alert variant="warningOutline" message="Some message" />
                <Alert variant="errorOutline" message="Some message" />
                <Alert variant="successOutline" message="Some message" />
            </div>
        </div>
    )
}
