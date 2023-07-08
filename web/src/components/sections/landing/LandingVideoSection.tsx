import { Card } from '@mui/material';

function LandingVideoSection() {
    return (
        <section id="mission" className="bg-white py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">All-in-one software for sustainable supply chains</h2>
                    <Card style={{ maxWidth: '960px', margin: 'auto', marginTop: '40px', padding: '0px' }}>
                        <div style={{ position: 'relative', paddingBottom: '56.25%' /* 16:9 */, height: 0 }}>
                            <iframe 
                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                src="https://www.youtube.com/embed/ZDqw2COKLmg"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}

export default LandingVideoSection;