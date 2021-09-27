package com.darass.common;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Slf4j
@Aspect
@Component
public class LoggingAspect {

    private static final String FORMAT = "invoke method : {} - {} / elapsed time : {}";
    private static final double MILLI_SECOND_TO_SECOND_UNIT = 0.001;
    private static final double MAX_AFFORDABLE_TIME = 3;

    @Around("execution(* com.darass.darass..*Controller.*(..))")
    public Object printLog(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.currentTimeMillis();
        Object proceed = joinPoint.proceed();
        long endTime = System.currentTimeMillis();

        double elapsedTime = (endTime - startTime) * MILLI_SECOND_TO_SECOND_UNIT;

        String className = joinPoint.getSignature().getDeclaringTypeName();
        String methodName = joinPoint.getSignature().getName();

        if (elapsedTime > MAX_AFFORDABLE_TIME) {
            log.warn(FORMAT, className, methodName, elapsedTime);

            return proceed;
        }

        log.info(FORMAT, className, methodName, elapsedTime);

        return proceed;
    }
}
