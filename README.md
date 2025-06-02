# PEDEVAL - Pedestrian Element Development Evaluation and Analysis

PEDEVAL is an interactive research tool designed to visualize and analyze pedestrian-related transportation projects and crash data across Texas. It supports planners, researchers, and advocates working to improve pedestrian safety and infrastructure.

The platform brings together comprehensive datasets to support research, advocacy, and planning for safer streets. PEDEVAL integrates data from official sources, including Texas Department of Transportation (TxDOT) pedestrian-related project funding records and CRIS crash datasets.

## Features

- **Explore Critical Crash Insights**: Gain visibility into pedestrian-focused transportation infrastructure and crash trends across Texas.
- **Map-Centric Visualization**: Interactive, high-performance maps help you explore TxDOT projects and crash incidents with geospatial clarity.
- **Linked Crash + Project Data**: The only tool that shows both crash data and project investments side-by-side.
- **Open, Extensible, Research-Ready**: All data used is open source and exportable.

## Technology Stack

- Next.js 15.3 (React 19)
- TypeScript
- Tailwind CSS
- MapLibre GL / React Map GL for mapping visualization
- Radix UI for accessible components
- Shadcn UI for modern design components

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- Yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/gauravfs-14/pedeval-pedsafe.git
   cd pedeval-pedsafe
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

```bash
src/
├── app/             # Next.js app router files
├── components/      # Reusable UI components
├── data/            # Data configuration and constants
├── lib/             # Utility functions and helpers
```

## Building for Production

```bash
yarn build
```

To start the production server:

```bash
yarn start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

All rights reserved. © PEDEVAL

## Contact

For any questions or feedback, please open an issue on the GitHub repository or contact the maintainers.

> This project is developed and maintained by [Gaurab Chhetri](https://gaurabchhetri.com.np), and supported by the [AIT (Artirificial Intelligence in Transportation)](https://ait-lab.vercel.app) Lab at the Texas State University.
