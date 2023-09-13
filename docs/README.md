<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/jbsiddall/hubmodel">
    <img src="static/icon.png" alt="Logo" width="160" height="160">
  </a>

<h3 align="center">HubModel</h3>

<p align="center">
    Access hubspot like an ORM. Full Typescript Support.
    Inspired by Prisma.io's API
    <br />
    <a href="https://hubmodel.dev"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    ·
    <a href="https://github.com/jbsiddall/hubmodel/issues">Report Bug</a>
    ·
    <a href="https://github.com/jbsiddall/hubmodel/discussions">Request Feature</a>
    ·
    <a href="https://github.com/jbsiddall/hubmodel/discussions">Ask a Question</a>
    ·
    <a href="https://github.com/jbsiddall/hubmodel/discussions">Say Hello 👋</a>

</p>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/joseph-siddall/)

</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#about-the-project">About The Project</a></li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#faq">FAQ</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<!-- [![Product Name Screen Shot][product-screenshot]](https://example.com) -->

Goals of this library:

- fully type safe access to hubspot REST API to access all types in hubspot like contacts, deals, and especially
  including custom types

- code first approach to maintaining the types and property in hubspot. just like any standard ORM like prisma, you
  define all the types in code and then run a migration to update hubspot.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally. To get a local copy up and
running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

Get a hubspot access token. Instructions here
[https://developers.hubspot.com/docs/api/private-apps](https://developers.hubspot.com/docs/api/private-apps).

_Node_

NPM:

```bash
$ npm install hubmodel
```

YARN:

```bash
$ yarn add hubmodel
```

PNPM:

```bash
$ pnpm add hubmodel
```

_DENO_

```typescript
import {...} from "https://deno.land/x/hubmodel/mod.ts"
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## Usage

_For more examples, please refer to the [Documentation](https://hubmodel.dev)_

### fetching

### fetching

```typescript

// retreive all contacts and all their properties
await client.contacts.findMany({});

// retrieve all contacts but only include the 3 properties
await client.contacts.findMany({
  select: {
    address: true,
    hs_createdate: true,
    email: true,
    firstname: true,
  },
});

```

```typescript:./example/find-many-pagination.ts
```

### creating

### deleting

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## FAQ

_Why create your own client instead of fixing the types of the existing hubspot client?_

Fixing existing hubspot client types was originally the approach but i had some issues with its API design, so felt i
could kill 2 birds with 1 stone by diverging from the original client.

_What should i do if this hubspot client is missing a hubspot endpoint?_

Depends. Hubspot client has a lot of endpoints to cover, so instead of trying to replace all functionality, this library
focuses on making the majority of the workflows intuitive with typescript and leaving the remaining workflows to the
original hubspot client. If you need to use an endpoint that this library doesn't have, in the short term, I'd recommend
using the hubspot client. In the long term, this library might want to support the endpoints so file a github
ticket/discussion etc and we can discuss :)

<!-- ROADMAP -->

## Roadmap

- [x] Cli to generate bespoke hubspot model for the hubspot account
- [x] Query hubspot collections
- [x] specify fields to read on the collection using a `select`
- [ ] filter which objects to retrieve from hubspot using a `where`
- [ ] Select nested associated objects
- [ ] collection pipelines
- [ ] retrieve a properties historical values
- [ ] retrieve a collections activity
- [ ] Create hubspot objects
- [ ] Create associations between hubspot objects
- [ ] Update an object's fields
- [ ] Update an object's associations
- [ ] ORM - ORM like functionality, defining your hubspot schema in code and then syncing it to hubspot directly just
      like you would for a database. Inspired by [https://www.prisma.io/](https://www.prisma.io/)

See the [open issues](https://github.com/jbsiddall/hubmodel/issues) for a full list of known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any
contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also
simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Joseph Siddall - j.b.siddall@gmail.com

Github Link: [https://github.com/jbsiddall/hubmodel](https://github.com/jbsiddall/hubmodel) Docs Link:
[https://hubmodel.dev/](https://hubmodel.dev/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
