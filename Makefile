site:
	rm -fr /tmp/docs \
	  && cp -fr docs /tmp/docs \
	  && git checkout gh-pages \
  	&& cp -fr /tmp/docs/* ./docs \
		&& echo "done"

test:
	mocha specs/* --reporter spec --require should --ignore-leaks --timeout 20000


.PHONY: site
