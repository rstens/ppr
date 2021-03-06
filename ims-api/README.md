# IMS API

The IMS API is a proxy for accessing existing PPR Transactions that were built in the IMS Mainframe.

## Developer Setup

1. Java 11 or above is required to build and run the API
1. You can build the application from the command line with the gradle wrapper: `./gradlew test`

## Application Configuration

Several configuration settings are needed to connect to the mainframe server.  The table below describes the settings
available in this API. See the [Spring Boot Externalized Configuration document](https://docs.spring.io/spring-boot/docs/current/reference/html/spring-boot-features.html#boot-features-external-config)
for the many ways to specify these values, including environment variables.

This system uses [Sentry](https://sentry.io/) for error monitoring.  The minimum prescribed settings are described
below. See the [Java Configuration document](https://docs.sentry.io/clients/java/config/) to see all the available
settings.

| Property Name | Environment Variable | Description |
| ------------- | -------------------- | ----------- |
| ims.hostname | IMS_HOSTNAME | **Required** |
| ims.port | IMS_PORT | **Required** |
| ims.data_store | IMS_DATA_STORE | **Required**, _Max: 8 characters_ |
| ims.username | IMS_USERNAME | **Required**, _Max: 8 characters_ |
| ims.password | IMS_PASSWORD | **Required**, _Max: 8 characters_ |
| ims.l_term | IMS_LTERM | **Required**, _Max: 8 characters_ |
| ims.group | IMS_GROUP | **Optional**, _Default: `""`_. |
| ims.execution_timeout | IMS_EXECUTION_TIMEOUT | **Optional**, _Default: 25000_. The execution timeout to specify to IMS, in milliseconds. |
| ims.socket_timeout | IMS_SOCKET_TIMEOUT | **Optional**, _Default: 30000_. The socket timeout when calling IMS, in milliseconds. |
| ims.pooling_enabled | IMS_POOLING_ENABLED | **Optional**, _Default: false_. Whether to use connection pooling to the IMS Server. |
| ims.min_connections | IMS_MIN_CONNECTIONS | **Optional**, _Default: 1_. Minimum connections, when pooling is enabled. |
| ims.max_connections | IMS_MAX_CONNECTIONS | **Optional**, _Default: 5_. Maximum connections, when pooling is enabled. |
| ims.ssl_enabled | IMS_SSL_ENABLED | **Optional**, _Default: false_. |
| sentry.dns | SENTRY_DSN | **Recommended**. If not specified, Sentry will not receive any notifications from the API. See [Setting the DSN](https://docs.sentry.io/clients/java/config/#setting-the-dsn). |
| sentry.environment | SENTRY_ENVIRONMENT | **Recommended**. See [Environment](https://docs.sentry.io/clients/java/config/#environment). |

### Jaeger Tracing Config

See the [Jaeger Client Config Documentation](https://github.com/jaegertracing/jaeger-client-java/blob/v1.0.0/jaeger-core/README.md#configuration-via-environment)
for detailed instructions on how to configure instrumentation.  If not specified, defaults will be used.
`JAEGER_SERVICE_NAME` will be overriden with `ims-api`.

By default the `JAEGER_SAMPLER_PARAM` is set to `0.001`, so you are unlikely to see spans reported locally unless you
override this value.

The [docker-compose.yml](../docker-compose.yml) in the project root directory can be used to run Jaeger on your local
system. The Jaeger Java client will use the instance running on `localhost` by default.
