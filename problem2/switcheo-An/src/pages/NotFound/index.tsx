const NotFound = () => {
  return (
    <section className="flex h-screen items-center p-16">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold text-slate-400">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mb-8 mt-4">
            But don't worry, you can find plenty of other things on our
            homepage.
          </p>
          <a
            rel="noopener noreferrer"
            href="/"
            className="rounded-2xl border border-solid border-cyan-500 px-8 py-3 font-semibold"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
