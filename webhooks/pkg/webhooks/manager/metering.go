package main

import (
	// "encoding/json"
	c "github.com/cloudfoundry-incubator/service-fabrik-broker/webhooks/pkg/webhooks/manager/constants"
	"github.com/cloudfoundry-incubator/service-fabrik-broker/webhooks/pkg/webhooks/manager/resources"
	"github.com/golang/glog"
	"github.com/google/uuid"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"time"
)

// ServiceInfo holds the service id and plan id
type ServiceInfo struct {
	// The id mentioned is the SKU name of service
	// like redis, postgresql and not uutd
	ID   string `json:"id"`
	Plan string `json:"plan"`
}

// ConsumerInfo holds the consumer related details
type ConsumerInfo struct {
	Environment string `json:"environment"`
	Region      string `json:"region"`
	Org         string `json:"org"`
	Space       string `json:"space"`
	Instance    string `json:"instance"`
}

// InstancesMeasure holds the measured values
type InstancesMeasure struct {
	ID    string `json:"id"`
	Value int    `json:"value"`
}

// SfeventOptions represents the options field of Sfevent Resource
type SfeventOptions struct {
	ID                string             `json:"id"`
	Timestamp         string             `json:"timestamp"`
	ServiceInfo       ServiceInfo        `json:"service"`
	ConsumerInfo      ConsumerInfo       `json:"consumer"`
	InstancesMeasures []InstancesMeasure `json:"measures"`
}

// SfeventSpec represents the spec field of metering resource
type SfeventSpec struct {
	metav1.ObjectMeta `json:"metadata,omitempty"`
	Options           SfeventOptions `json:"options,omitempty"`
}

// Sfevent structure holds all the details related to
// Sfevent event,  models schema here:
// https://wiki.wdf.sap.corp/wiki/display/CPC15N/Usage+Document+Detailed+Schema
type Sfevent struct {
	Spec SfeventSpec `json:"spec"`
}

func (m *Sfevent) getName() string {
	// var meteringOptions SfeventOptions
	// json.Unmarshal([]byte(m.Spec.Options), &meteringOptions)
	return m.Spec.Options.ID
}

func newMetering(opt resources.GenericOptions, crd resources.GenericResource, signal int) *Sfevent {
	si := ServiceInfo{
		ID:   opt.ServiceID,
		Plan: opt.PlanID,
	}
	ci := ConsumerInfo{
		Environment: "",
		Region:      "",
		Org:         opt.Context.OrganizationGUID,
		Space:       opt.Context.SpaceGUID,
		Instance:    crd.Name,
	}
	//Assing the environment
	switch opt.Context.Platform {
	case c.Cloudfoundry:
		ci.Environment = c.Cf
	default:
		ci.Environment = ""
	}
	im := InstancesMeasure{
		ID:    c.MeasuresID,
		Value: signal,
	}
	guid := uuid.New().String()

	mo := SfeventOptions{
		ID:                guid,
		Timestamp:         time.Now().UTC().Format(c.MeteringTimestampFormat),
		ServiceInfo:       si,
		ConsumerInfo:      ci,
		InstancesMeasures: []InstancesMeasure{im},
	}
	glog.Infof("New metering event for CRD: %s, Sfevent Id: %s", crd.Name, guid)
	m := &Sfevent{
		Spec: SfeventSpec{
			Options: mo,
		},
	}
	return m
}