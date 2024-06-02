
const tasks = [
    {
        title: 'Develop social media strategy',
        content: 'Create a comprehensive strategy for social media platforms, including content calendar and engagement plans.',
        avatars: [
            {
                name: 'Alice Johnson',
                letter: 'A'
            },
            {
                name: 'Bob Roberts',
                letter: 'B'
            }
        ],
        ribbon: {
            text: 'High Priority',
            color: 'red'
        }
    },
    {
        title: 'Design new website layout',
        content: 'Revamp the company website to improve user experience and increase conversion rates.',
        avatars: [
            {
                name: 'Chris Evans',
                letter: 'C'
            },
            {
                name: 'Dana White',
                letter: 'D'
            }
        ],
        ribbon: {
            text: 'Urgent',
            color: 'orange'
        }
    },
    {
        title: 'Plan marketing campaign for product launch',
        content: 'Develop and execute a marketing campaign for the upcoming product launch, including digital and offline strategies.',
        avatars: [
            {
                name: 'Emma Watson',
                letter: 'E'
            },
            {
                name: 'Frank Martin',
                letter: 'F'
            }
        ],
        ribbon: {
            text: 'Critical',
            color: 'red'
        }
    },
    {
        title: 'Conduct market research',
        content: 'Gather and analyze data on market trends, customer preferences, and competitive landscape.',
        avatars: [
            {
                name: 'George Harrison',
                letter: 'G'
            },
            {
                name: 'Hannah Brown',
                letter: 'H'
            }
        ],
        ribbon: {
            text: 'Important',
            color: 'yellow'
        }
    },
    {
        title: 'Create content for blog and newsletter',
        content: 'Write and schedule articles for the company blog and monthly newsletter to engage with our audience.',
        avatars: [
            {
                name: 'Ian McKellen',
                letter: 'I'
            },
            {
                name: 'Jane Doe',
                letter: 'J'
            }
        ],
        ribbon: {
            text: 'Medium Priority',
            color: 'blue'
        }
    },
    {
        title: 'Optimize SEO for all web pages',
        content: 'Improve the search engine rankings of the website through keyword research, on-page and off-page SEO techniques.',
        avatars: [
            {
                name: 'Kevin Spacey',
                letter: 'K'
            },
            {
                name: 'Linda Smith',
                letter: 'L'
            }
        ],
        ribbon: {
            text: 'High Priority',
            color: 'red'
        }
    },
    {
        title: 'Analyze campaign performance',
        content: 'Review and report on the performance of recent marketing campaigns, identifying key insights and areas for improvement.',
        avatars: [
            {
                name: 'Michael Jordan',
                letter: 'M'
            },
            {
                name: 'Nina Dobrev',
                letter: 'N'
            }
        ],
        ribbon: {
            text: 'Critical',
            color: 'red'
        }
    },
    {
        title: 'Develop email marketing strategy',
        content: 'Create and implement an effective email marketing strategy to nurture leads and increase customer engagement.',
        avatars: [
            {
                name: 'Olivia Wilde',
                letter: 'O'
            },
            {
                name: 'Peter Parker',
                letter: 'P'
            }
        ],
        ribbon: {
            text: 'Important',
            color: 'yellow'
        }
    },
    {
        title: 'Coordinate with influencers',
        content: 'Identify and collaborate with influencers to promote our brand and products on social media platforms.',
        avatars: [
            {
                name: 'Quentin Tarantino',
                letter: 'Q'
            },
            {
                name: 'Rachel Green',
                letter: 'R'
            }
        ],
        ribbon: {
            text: 'Medium Priority',
            color: 'blue'
        }
    },
    {
        title: 'Prepare monthly performance reports',
        content: 'Compile and present monthly reports on marketing performance metrics and KPIs to the management team.',
        avatars: [
            {
                name: 'Steve Rogers',
                letter: 'S'
            },
            {
                name: 'Tony Stark',
                letter: 'T'
            }
        ],
        ribbon: {
            text: 'High Priority',
            color: 'red'
        }
    },
    {
        title: 'Manage advertising budget',
        content: 'Monitor and manage the marketing advertising budget to ensure optimal allocation of resources.',
        avatars: [
            {
                name: 'Uma Thurman',
                letter: 'U'
            },
            {
                name: 'Vin Diesel',
                letter: 'V'
            }
        ],
        ribbon: {
            text: 'Urgent',
            color: 'orange'
        }
    },
    {
        title: 'Host a webinar on industry trends',
        content: 'Plan and conduct a webinar to discuss the latest trends and insights in the marketing industry.',
        avatars: [
            {
                name: 'Will Smith',
                letter: 'W'
            },
            {
                name: 'Xander Cage',
                letter: 'X'
            }
        ],
        ribbon: {
            text: 'Important',
            color: 'yellow'
        }
    },
    {
        title: 'Update and maintain CRM system',
        content: 'Ensure the CRM system is up to date with accurate customer information and lead details.',
        avatars: [
            {
                name: 'Yara Shahidi',
                letter: 'Y'
            },
            {
                name: 'Zayn Malik',
                letter: 'Z'
            }
        ],
        ribbon: {
            text: 'Critical',
            color: 'red'
        }
    },
    {
        title: 'Plan and execute a PR campaign',
        content: 'Develop and implement a public relations campaign to enhance the company’s brand image and reputation.',
        avatars: [
            {
                name: 'Alex Turner',
                letter: 'A'
            },
            {
                name: 'Britney Spears',
                letter: 'B'
            }
        ],
        ribbon: {
            text: 'High Priority',
            color: 'red'
        }
    },
    {
        title: 'Design promotional materials',
        content: 'Create and design promotional materials such as flyers, brochures, and banners for upcoming events.',
        avatars: [
            {
                name: 'Charlie Chaplin',
                letter: 'C'
            },
            {
                name: 'David Beckham',
                letter: 'D'
            }
        ],
        ribbon: {
            text: 'Medium Priority',
            color: 'blue'
        }
    },
    {
        title: 'Organize a charity event',
        content: 'Plan and organize a charity event to support a local cause and increase community engagement.',
        avatars: [
            {
                name: 'Elon Musk',
                letter: 'E'
            },
            {
                name: 'Fiona Apple',
                letter: 'F'
            }
        ],
        ribbon: {
            text: 'Important',
            color: 'yellow'
        }
    },
    {
        title: 'Develop video content strategy',
        content: 'Create a strategy for producing and distributing video content to boost brand awareness and engagement.',
        avatars: [
            {
                name: 'Gwyneth Paltrow',
                letter: 'G'
            },
            {
                name: 'Harry Styles',
                letter: 'H'
            }
        ],
        ribbon: {
            text: 'Critical',
            color: 'red'
        }
    }
];

export default tasks;