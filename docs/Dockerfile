FROM debian:12-slim

RUN apt-get update && \
    apt-get -y install ruby-full build-essential

RUN useradd -m pdechery

ENV HOME="/home/pdechery"

ENV GEM_HOME="$HOME/gems"
ENV PATH="$HOME/gems/bin:$PATH"

USER pdechery

RUN gem install jekyll bundler

WORKDIR $HOME/blog

COPY _config.yml .
COPY Gemfile .

RUN bundle

CMD ["env"]



