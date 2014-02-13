/* from firmaware conf:
sensors are (indexed from zero):
humidity
temperature
light
ultrasound
Dallas one wire devices
*/

app.controller('TriggersController', ['$scope', '$http', 'Triggers', 'triggerTransformer', 'SensorStatus', function($scope, $http, Triggers, triggerTransformer, SensorStatus) {

    $scope.timers = [[], []];

    var FAN_TRIGGERS = ['temperatureOptimal', 'humidityOptimal', 'fanInterval', 'fanCritical'];

    FAN_TRIGGERS.forEach(function(key) {
        $scope[key] = triggerTransformer.createEmpty(key);
    });
    $scope.loading = true;
    $scope.loadingStep = 0;
    $scope.loadingPercent = 0;

    function createDisabledTrigger() {
        return {t_since:-1, t_until:-1, on_value: "<-256", off_value:">-512", sensor:-1, output:-1};
    }

    function serializeTriggers() {
        //todo magic constants for outputs
        var triggers = [];

        FAN_TRIGGERS.forEach(function(key) {
            var trigger = triggerTransformer.pack($scope[key]);
            if (trigger) {
                triggers.push(trigger);
            }
        });

        $scope.timers.forEach(function(ranges, output) {
            ranges.forEach(function(range) {
                var trigger = triggerTransformer.pack(range);
                if (trigger) {
                    trigger.output = output;
                    triggers.push(trigger);
                }
            });
        });

        for (var i = triggers.length; i < $scope.triggerCount; i++) {
            triggers.push(createDisabledTrigger());
        }

        triggers.forEach(function(trigger, i) {
            trigger.index = i;
        });

        return triggers;
    }

    $scope.toggleSentinel = function(sentinel) {
        sentinel.active = !sentinel.active;
    };

    $scope.saveTriggers = function() {
        if ($scope.saving) return;
        $scope.saving = true;

        var triggers = serializeTriggers();

        Triggers.save(triggers, function() {
            $scope.saving = false;
        });
    };

    SensorStatus.get(function(data) {
        //$scope.triggerCount = data.triggers;
        $scope.triggerCount = 8; //debug

        Triggers.loadAll($scope.triggerCount,
            function(trigger) {
                $scope.loadingStep += 1;
                $scope.loadingPercent = parseInt($scope.loadingStep / $scope.triggerCount * 100, 10);
                u = triggerTransformer.unpack(trigger);
                if (u) {
                    if (u.triggerClass === 'timer') {
                        $scope.timers[u.trigger.output].push(u);
                    } else {
                        $scope[u.triggerClass] = u;
                    }
                    return;
                }
            }, function() {
                $scope.loadingPercent = 100;
                $scope.timers.forEach(function(ranges) {
                    ranges.sort(function(a, b) {
                        if (a.since != b.since) {
                            return utils.timeToMinutes(a.since) - utils.timeToMinutes(b.since);
                        } else {
                            return utils.timeToMinutes(a.until) - utils.timeToMinutes(b.until);
                        }

                    });
                });
                $scope.loading = false;
            }
        );
    });
}]);

app.controller('TimerController', ['$scope', 'triggerTransformer', function($scope, triggerTransformer) {
    var ranges = $scope.$parent.timer;

    $scope.addRange = function() {
        ranges.push(triggerTransformer.createEmpty('timer'));
    };

    $scope.toggleRange = function(idx) {
        if (ranges[idx].trigger) {
            ranges[idx].active = !ranges[idx].active;
        } else {
            ranges.splice(idx, 1);
        }
    };
}]);